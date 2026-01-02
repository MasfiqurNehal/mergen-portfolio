const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// MongoDB Schemas
const statusCheckSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  client_name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const contactMessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'new' }
});

const StatusCheck = mongoose.model('StatusCheck', statusCheckSchema);
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

// Email transporter setup
let transporter = null;
if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
  console.log('✅ Email transporter configured');
} else {
  console.log('⚠️ SMTP credentials not configured. Emails will not be sent.');
}

// Helper function to generate UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Status Check Routes
app.post('/api/status', async (req, res) => {
  try {
    const { client_name } = req.body;
    
    const statusCheck = new StatusCheck({
      id: generateUUID(),
      client_name,
      timestamp: new Date()
    });
    
    await statusCheck.save();
    
    res.json({
      id: statusCheck.id,
      client_name: statusCheck.client_name,
      timestamp: statusCheck.timestamp
    });
  } catch (error) {
    console.error('Error creating status check:', error);
    res.status(500).json({ error: 'Failed to create status check' });
  }
});

app.get('/api/status', async (req, res) => {
  try {
    const statusChecks = await StatusCheck.find({}, { _id: 0, __v: 0 }).limit(1000);
    res.json(statusChecks);
  } catch (error) {
    console.error('Error fetching status checks:', error);
    res.status(500).json({ error: 'Failed to fetch status checks' });
  }
});

// Contact Form Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, address, comment } = req.body;
    
    // Validate required fields
    if (!name || !email || !comment) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }
    
    // Save to database
    const contactMessage = new ContactMessage({
      id: generateUUID(),
      name,
      email,
      phone: phone || '',
      address: address || '',
      comment,
      timestamp: new Date(),
      status: 'new'
    });
    
    await contactMessage.save();
    console.log(`✅ New contact message from ${name} (${email})`);
    
    // Send email if transporter is configured
    if (transporter) {
      try {
        const mailOptions = {
          from: process.env.SMTP_USER,
          to: 'nehal@masfiqurnehal.com',
          subject: `Portfolio Contact: Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
              <h2 style="color: #2563eb; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">New Portfolio Contact Message</h2>
              
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p><strong style="color: #2563eb;">From:</strong> ${name}</p>
                <p><strong style="color: #2563eb;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong style="color: #2563eb;">Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong style="color: #2563eb;">Location:</strong> ${address || 'Not provided'}</p>
                
                <div style="margin-top: 20px; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #06b6d4; border-radius: 4px;">
                  <p style="margin: 0;"><strong style="color: #2563eb;">Message:</strong></p>
                  <p style="margin-top: 10px; white-space: pre-wrap;">${comment}</p>
                </div>
              </div>
              
              <p style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
                Sent from your portfolio website at ${new Date().toISOString()}
              </p>
            </div>
          `,
          text: `
New Portfolio Contact Message
============================

From: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Location: ${address || 'Not provided'}

Message:
${comment}

---
Sent from your portfolio website at ${new Date().toISOString()}
          `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully to nehal@masfiqurnehal.com');
      } catch (emailError) {
        console.error('❌ Failed to send email:', emailError.message);
        // Continue even if email fails - message is saved to database
      }
    }
    
    res.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      id: contactMessage.id
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or email directly.'
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  mongoose.connection.close();
  process.exit(0);
});
