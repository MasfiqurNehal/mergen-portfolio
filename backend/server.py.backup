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
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


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
    Contact form endpoint - stores message in database and sends email
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
        
        # Send email notification
        try:
            # Create email message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"Portfolio Contact: Message from {form_data.name}"
            msg['From'] = "portfolio@masfiqurnehal.com"
            msg['To'] = "nehal@masfiqurnehal.com"
            
            # HTML email body
            html_body = f"""
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                  <h2 style="color: #2563eb; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">New Portfolio Contact Message</h2>
                  
                  <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <p><strong style="color: #2563eb;">From:</strong> {form_data.name}</p>
                    <p><strong style="color: #2563eb;">Email:</strong> <a href="mailto:{form_data.email}">{form_data.email}</a></p>
                    <p><strong style="color: #2563eb;">Phone:</strong> {form_data.phone if form_data.phone else 'Not provided'}</p>
                    <p><strong style="color: #2563eb;">Location:</strong> {form_data.address if form_data.address else 'Not provided'}</p>
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #06b6d4; border-radius: 4px;">
                      <p style="margin: 0;"><strong style="color: #2563eb;">Message:</strong></p>
                      <p style="margin-top: 10px; white-space: pre-wrap;">{form_data.comment}</p>
                    </div>
                  </div>
                  
                  <p style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
                    Sent from your portfolio website at {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}
                  </p>
                </div>
              </body>
            </html>
            """
            
            # Plain text alternative
            text_body = f"""
New Portfolio Contact Message
============================

From: {form_data.name}
Email: {form_data.email}
Phone: {form_data.phone if form_data.phone else 'Not provided'}
Location: {form_data.address if form_data.address else 'Not provided'}

Message:
{form_data.comment}

---
Sent from your portfolio website at {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}
            """
            
            part1 = MIMEText(text_body, 'plain')
            part2 = MIMEText(html_body, 'html')
            msg.attach(part1)
            msg.attach(part2)
            
            # Get SMTP settings from environment or use defaults
            smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
            smtp_port = int(os.environ.get('SMTP_PORT', '587'))
            smtp_user = os.environ.get('SMTP_USER', '')
            smtp_password = os.environ.get('SMTP_PASSWORD', '')
            
            # Only attempt to send if SMTP credentials are configured
            if smtp_user and smtp_password:
                with smtplib.SMTP(smtp_host, smtp_port) as server:
                    server.starttls()
                    server.login(smtp_user, smtp_password)
                    server.send_message(msg)
                logger.info(f"Email sent successfully to nehal@masfiqurnehal.com")
            else:
                logger.warning("SMTP credentials not configured. Email not sent. Message saved to database.")
        
        except Exception as email_error:
            logger.error(f"Failed to send email: {str(email_error)}")
            # Continue even if email fails - message is still in database
        
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