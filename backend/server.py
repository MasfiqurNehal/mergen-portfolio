from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    name: str
    email: str
    phone: str = ""
    address: str = ""
    comment: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact")
async def contact_form(form_data: ContactForm):
    """
    Contact form endpoint - stores message in database
    
    Note: To enable email sending, you need to configure an email service:
    - Option 1: Add SMTP credentials to .env (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD)
    - Option 2: Use SendGrid API (add SENDGRID_API_KEY to .env)
    - Option 3: Use AWS SES (configure AWS credentials)
    
    For now, messages are stored in MongoDB.
    """
    try:
        # Store contact message in database
        contact_doc = {
            "id": str(uuid.uuid4()),
            "name": form_data.name,
            "email": form_data.email,
            "phone": form_data.phone,
            "address": form_data.address,
            "comment": form_data.comment,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "new"
        }
        
        await db.contact_messages.insert_one(contact_doc)
        
        logger.info(f"New contact message from {form_data.name} ({form_data.email})")
        
        # TODO: Implement email sending here when email service is configured
        # Example with SMTP:
        # import smtplib
        # from email.mime.text import MIMEText
        # send_email(to="nehal@masfiqurnehal.com", subject=f"Contact from {form_data.name}", body=form_data.comment)
        
        return {
            "success": True,
            "message": "Thank you for your message! I will get back to you soon.",
            "id": contact_doc["id"]
        }
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        return {
            "success": False,
            "message": "Failed to send message. Please try again or email directly."
        }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()