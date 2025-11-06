# 📧 PHP Mail Setup for Supreme Air Austin

## Overview
This setup replaces EmailJS with native PHP mail functionality, which works seamlessly with your BlueHost hosting.

## 🚀 Quick Setup (5 minutes)

### 1. Upload PHP File
- Upload `contact-form.php` to your website's **root directory** on BlueHost
- This should be in the same folder as your `index.html` file
- Path: `/public_html/contact-form.php`

### 2. Deploy Your Website
- Upload your `build` folder contents to `/public_html/`
- Ensure `contact-form.php` is in the same directory as `index.html`

### 3. Test the Contact Form
- Visit your website
- Fill out the contact form
- Check both email addresses for the message:
  - `supremeairusa@gmail.com`
  - `websiteleadsmail@gmail.com`

## 📁 File Structure on BlueHost
```
public_html/
├── index.html (your React app)
├── static/
│   ├── css/
│   └── js/
├── contact-form.php (PHP mail handler)
└── contact_log.txt (auto-created for logging)
```

## ✅ Features

### Email Functionality
- **Dual Recipients**: Sends to both email addresses automatically
- **HTML Formatting**: Professional email design with Supreme Air branding
- **Form Validation**: Server-side validation for security
- **Reply-To**: Customer's email is set as reply-to address
- **Subject Line**: "New Lead from Supreme Air Austin Website - [Customer Name]"

### Security Features
- **Input Sanitization**: All form data is cleaned and validated
- **CORS Headers**: Proper cross-origin request handling
- **Error Handling**: Graceful error messages for users
- **Logging**: Optional submission logging to `contact_log.txt`

### Email Content Includes
- Customer name, phone, email
- Service requested
- Customer message
- Submission timestamp
- Supreme Air branding and contact info

## 🔧 Configuration

### Email Recipients
To change email addresses, edit `contact-form.php`:
```php
$to = 'your-email@domain.com, another-email@domain.com';
```

### Email Styling
The email uses inline CSS for maximum compatibility. Colors match your brand:
- Header: `#009ed7` (Supreme Air blue)
- Text: Professional formatting

## 🐛 Troubleshooting

### Common Issues

1. **"Method not allowed" error**
   - Ensure the form is sending POST requests
   - Check that `contact-form.php` is in the correct directory

2. **Emails not received**
   - Check spam folders
   - Verify BlueHost allows PHP mail() function
   - Check `contact_log.txt` for submission records

3. **CORS errors**
   - Ensure `contact-form.php` has proper CORS headers
   - Check that the file is accessible via web browser

### Testing PHP Mail
Test the PHP file directly:
```
https://yourdomain.com/contact-form.php
```
Should return: `{"success":false,"message":"Method not allowed"}`

## 📊 Benefits Over EmailJS

| Feature | EmailJS | PHP Mail |
|---------|---------|----------|
| **Setup** | Complex API setup | Simple file upload |
| **Dependencies** | Third-party service | Native hosting |
| **Cost** | Free tier limits | No limits |
| **Reliability** | Depends on service | Uses your hosting |
| **Customization** | Limited | Full control |
| **WordPress Compatible** | No | Yes (same system) |

## 🔒 Security Notes

- The PHP file includes input sanitization
- Form validation prevents empty submissions
- Email headers are properly formatted
- No sensitive data is logged

## 📞 Support

If you encounter issues:
1. Check BlueHost PHP mail settings
2. Verify file permissions (644 for PHP file)
3. Test with a simple PHP mail script first
4. Contact BlueHost support if PHP mail is disabled

---

**Ready to go!** Your contact forms will now work exactly like WordPress forms on your BlueHost hosting. 🎉
