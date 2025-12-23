# Contact Form Setup Guide

This guide explains how to set up the email functionality for the contact form.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Contact Email (recipient)
CONTACT_EMAIL=info@clamore.bergamo.it

# Send confirmation email to user (optional)
SEND_CONFIRMATION_EMAIL=true
```

## SMTP Configuration Examples

### Gmail

1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Create a new app password for "Mail"
   - Use this password in `SMTP_PASSWORD`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
```

### Outlook / Microsoft 365

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailgun-username
SMTP_PASSWORD=your-mailgun-password
```

### Custom SMTP Server

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASSWORD=your-password
```

For port 465, set `SMTP_SECURE=true`.

## Testing

1. Fill out the contact form at `/contact`
2. Submit the form
3. Check that:
   - You receive an email at `CONTACT_EMAIL`
   - If enabled, the user receives a confirmation email

## Troubleshooting

- **"Email configuration is missing"**: Make sure all SMTP environment variables are set
- **"Authentication failed"**: Check your SMTP credentials
- **"Connection timeout"**: Verify SMTP_HOST and SMTP_PORT are correct
- **Emails not sending**: Check your server logs for detailed error messages

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords instead of regular passwords when possible
- For production, consider using a dedicated email service like SendGrid or Mailgun





