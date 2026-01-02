# Email Configuration Instructions

## To Enable Email Sending for Contact Form

The contact form is configured to send emails to `nehal@masfiqurnehal.com`, but requires SMTP credentials to be set up.

### Option 1: Gmail SMTP (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings → Security → 2-Step Verification
   - Scroll down to "App passwords"
   - Select "Mail" and generate a password

3. **Add to `/app/backend/.env`**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password-here
```

### Option 2: Custom SMTP Server

If you have a custom email server:

```env
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=portfolio@masfiqurnehal.com
SMTP_PASSWORD=your-password-here
```

### Option 3: Using SendGrid (Production Recommended)

1. Sign up at https://sendgrid.com
2. Get your API key
3. Update backend code to use SendGrid API instead of SMTP

### Current Behavior

**Without SMTP credentials configured:**
- Contact form messages are **stored in MongoDB**
- You can view them by querying the `contact_messages` collection
- Email sending is **skipped** (logged as warning)
- User still sees success message

**With SMTP credentials configured:**
- Contact form messages are stored in MongoDB
- Email is **sent to nehal@masfiqurnehal.com**
- Beautiful HTML-formatted email with all contact details

### Testing

After adding SMTP credentials:

1. Restart the backend:
```bash
sudo supervisorctl restart backend
```

2. Submit a test message through the contact form

3. Check your email at `nehal@masfiqurnehal.com`

### Security Note

Never commit `.env` files with real credentials to version control!
