# n8n Contact Form Workflow Setup

This guide will help you set up the n8n workflow to receive contact form submissions.

## Quick Start

### Option 1: Import the Simple Workflow (Recommended for Testing)

1. Open your n8n instance
2. Click **"Workflows"** → **"Import from File"** or use the **"+"** button → **"Import from File"**
3. Select `n8n-contact-form-simple.json`
4. The workflow will be imported with:
   - Webhook trigger (receives POST requests)
   - CORS headers configured
   - Data structure set up

### Option 2: Import the Full Workflow (With Email)

1. Open your n8n instance
2. Click **"Workflows"** → **"Import from File"**
3. Select `n8n-contact-form-workflow.json`
4. **Configure SMTP credentials** for the email node:
   - Click on the "Send Email" node
   - Set up your SMTP credentials (Gmail, SendGrid, etc.)
   - Update the email addresses in the node settings

## After Importing

### 1. Get Your Webhook URL

1. Click on the **"Webhook"** node in your workflow
2. You'll see the webhook URL at the bottom (e.g., `https://aibotsy.app.n8n.cloud/webhook/abc123`)
3. Copy this URL

### 2. Activate the Workflow

1. Click the **"Active"** toggle in the top right (very important!)
2. The workflow must be active for the webhook to work

### 3. Update Your .env.local

Add the webhook URL to your `.env.local` file:

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://aibotsy.app.n8n.cloud/webhook/your-webhook-id
```

### 4. Rebuild Your Site

```bash
npm run build
```

## Workflow Structure

### Simple Workflow (`n8n-contact-form-simple.json`)
- **Webhook** → Receives POST requests from your form
- **Respond to Webhook** → Sends response with CORS headers
- **Set Data** → Structures the received data

### Full Workflow (`n8n-contact-form-workflow.json`)
- **Webhook** → Receives POST requests
- **Respond to Webhook** → Sends response with CORS headers
- **Send Email** → Sends formatted email notification (requires SMTP setup)

## Customizing the Workflow

### Adding Email Notifications

1. Add an **"Email Send"** node after "Respond to Webhook"
2. Configure your SMTP credentials
3. Use this template for the email body:

```
Name: {{ $json.body.name }}
Email: {{ $json.body.email }}
Phone: {{ $json.body.phone }}
Message: {{ $json.body.message }}
Timestamp: {{ $json.body.timestamp }}
```

### Adding Database Storage

1. Add a database node (PostgreSQL, MySQL, etc.)
2. Connect it after "Respond to Webhook"
3. Map the fields:
   - `name` → `{{ $json.body.name }}`
   - `email` → `{{ $json.body.email }}`
   - `phone` → `{{ $json.body.phone }}`
   - `message` → `{{ $json.body.message }}`
   - `timestamp` → `{{ $json.body.timestamp }}`

### Adding CRM Integration

You can add nodes for:
- **HubSpot** - Create contact
- **Salesforce** - Create lead
- **Pipedrive** - Create person
- **Zapier** - Connect to other services

## Testing the Webhook

You can test the webhook directly using curl:

```bash
curl -X POST https://your-n8n-webhook-url \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "message": "Test message",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "source": "contact-form"
  }'
```

## Troubleshooting

### CORS Errors
- Make sure the "Respond to Webhook" node has CORS headers configured
- Check that the workflow is **active**

### 404 Errors
- The workflow must be **active** (not just saved)
- Verify the webhook URL is correct

### Not Receiving Data
- Check the workflow execution history in n8n
- Verify the webhook URL matches your `.env.local` file
- Make sure you rebuilt the site after updating the environment variable

## Next Steps

After the workflow is working:
1. Add email notifications
2. Set up database storage
3. Integrate with your CRM
4. Add automation (e.g., auto-responder, lead scoring)

