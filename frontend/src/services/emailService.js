// PHP Mail Service for Supreme Air Austin with reCAPTCHA
// This will work with your BlueHost hosting

const PHP_MAIL_ENDPOINT = '/contact-form.php'; // Adjust path based on your hosting setup

export const sendContactEmail = async (formData, recaptchaToken) => {
  try {
    console.log('📧 Sending contact form via PHP mail with reCAPTCHA...');
    
    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      return { 
        success: false, 
        message: 'Please complete the reCAPTCHA verification.' 
      };
    }
    
    // Prepare form data for PHP
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name || '');
    formDataToSend.append('email', formData.email || '');
    formDataToSend.append('phone', formData.phone || '');
    formDataToSend.append('service', formData.service || 'General Inquiry');
    formDataToSend.append('message', formData.message || 'Contact form submission from website');
    formDataToSend.append('recaptcha_token', recaptchaToken);

    // Send to PHP endpoint
    const response = await fetch(PHP_MAIL_ENDPOINT, {
      method: 'POST',
      body: formDataToSend
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Email sent successfully via PHP mail with reCAPTCHA');
      return { success: true, message: result.message };
    } else {
      console.error('❌ PHP mail error:', result.message);
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error('❌ Failed to send email via PHP:', error);
    return { 
      success: false, 
      message: 'Sorry, there was an error sending your message. Please call us directly at (512) 277-9782.' 
    };
  }
};

// PHP Mail Setup Instructions for BlueHost
export const phpMailSetupInstructions = {
  steps: [
    "1. Upload contact-form.php to your website's root directory on BlueHost",
    "2. Ensure PHP mail() function is enabled on your hosting (usually enabled by default)",
    "3. Test the contact form to verify emails are being sent",
    "4. Check both recipient emails: supremeairusa@gmail.com and websiteleadsmail@gmail.com",
    "5. Monitor contact_log.txt for form submissions (optional logging)"
  ],
  benefits: [
    "✅ No third-party dependencies (EmailJS not needed)",
    "✅ Works directly with your BlueHost hosting",
    "✅ Uses PHP mail() function (same as WordPress)",
    "✅ Sends to multiple recipients automatically",
    "✅ Professional HTML email formatting",
    "✅ Form validation and security",
    "✅ Automatic logging of submissions"
  ],
  fileLocation: "Upload contact-form.php to your website's public_html directory"
};