# EmailJS Setup Instructions for Supreme Air Austin

## Quick Setup Guide

To make the contact forms send emails directly to supremeairusa@gmail.com and websiteleadsmail@gmail.com, follow these steps:

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account (allows 200 emails/month)

### 2. Add Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add Service" and choose "Gmail"
- Connect your Gmail account (recommend using info@supremeairaustin.com)

### 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template content:

```
Subject: New Lead from Supreme Air Austin - {{from_name}}

New contact form submission from supremeairaustin.com:

Name: {{from_name}}
Phone: {{from_phone}}
Email: {{from_email}}
Service Requested: {{service_type}}

Message:
{{message}}

Please respond to this lead promptly.

---
Supreme Air Austin
Austin's #1 Air Duct Cleaning Experts
Phone: (512) 277-9782
Website: supremeairaustin.com
```

- Set "To Email" to: supremeairusa@gmail.com, websiteleadsmail@gmail.com
- Set "Reply To" to: {{from_email}}

### 4. Get Your Credentials
- Copy your Service ID (from Email Services page)
- Copy your Template ID (from Email Templates page)  
- Copy your Public Key (from Account > API Keys)

### 5. Update the Code
- Open `/app/frontend/src/services/emailService.js`
- Replace these placeholders with your actual values:
  ```javascript
  const EMAIL_SERVICE_ID = 'your_service_id_here';
  const EMAIL_TEMPLATE_ID = 'your_template_id_here';
  const EMAIL_PUBLIC_KEY = 'your_public_key_here';
  ```

### 6. Test the Forms
- Save the changes and test the contact forms
- Check that emails arrive at both recipient addresses
- Verify the email content and formatting

## Template Variables Used
- `{{from_name}}` - Customer's name
- `{{from_phone}}` - Customer's phone number
- `{{from_email}}` - Customer's email address
- `{{service_type}}` - Selected service (Air Duct Cleaning, Attic Insulation, etc.)
- `{{message}}` - Customer's message

## Benefits of EmailJS
- ✅ No backend server required
- ✅ Direct email delivery
- ✅ Free tier available (200 emails/month)
- ✅ Easy to set up and configure
- ✅ Reliable email delivery
- ✅ Supports multiple recipient addresses

## Support
If you need help setting up EmailJS, contact their support team or refer to their documentation at https://www.emailjs.com/docs/