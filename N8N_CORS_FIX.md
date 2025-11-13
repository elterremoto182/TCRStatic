# Fixing CORS Errors in n8n

The CORS error occurs because browsers send a **preflight OPTIONS request** before the actual POST request, and n8n needs to respond to it with proper CORS headers.

## Solution 1: Configure CORS in n8n Webhook Node (Recommended)

### For n8n.cloud:

1. **Open your webhook node** in n8n
2. **Click on "Options"** in the webhook node settings
3. **Look for CORS settings** - n8n.cloud should have CORS configuration
4. **Enable CORS** and set:
   - `Access-Control-Allow-Origin: *` (or your specific domain)
   - `Access-Control-Allow-Methods: POST, OPTIONS`
   - `Access-Control-Allow-Headers: Content-Type`

### Manual Configuration:

If n8n.cloud doesn't have built-in CORS settings, you need to handle OPTIONS requests:

1. **Add a second webhook node** for OPTIONS method:
   - Create a new webhook node
   - Set HTTP Method to **OPTIONS**
   - Use the **same path** as your POST webhook
   - Connect it to a "Respond to Webhook" node with CORS headers

2. **Or use the workflow file**: Import `n8n-contact-form-cors-fixed.json` which has both OPTIONS and POST handlers

## Solution 2: Use the Updated Workflow

Import `n8n-contact-form-single-webhook.json` which:
- Uses an IF node to check the request method
- Handles both OPTIONS (preflight) and POST requests
- Responds with proper CORS headers for both

## Solution 3: n8n.cloud Specific Settings

Some n8n.cloud instances have CORS enabled by default for production domains. For localhost development:

1. Check if your n8n.cloud instance has **"Allow CORS"** option in webhook settings
2. Enable it if available
3. Or whitelist `http://localhost:3000` in CORS settings

## Solution 4: Test with Production Domain

CORS might work automatically for production domains. Try:
1. Deploy your site to a production domain
2. Test the form from the production URL
3. n8n.cloud may handle CORS automatically for production domains

## Solution 5: Use a CORS Proxy (Development Only)

As a temporary workaround for development, you could use a CORS proxy, but this is **NOT recommended for production**.

## Verification Steps

After setting up CORS:

1. **Activate your workflow** (very important!)
2. **Test the webhook directly** with curl:
   ```bash
   # Test OPTIONS (preflight)
   curl -X OPTIONS https://aibotsy.app.n8n.cloud/webhook-test/1c74962a-9286-4953-861c-28b28e9e4824 \
     -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -v
   
   # Should return CORS headers
   ```

3. **Check the response headers** - you should see:
   - `Access-Control-Allow-Origin: *`
   - `Access-Control-Allow-Methods: POST, OPTIONS`
   - `Access-Control-Allow-Headers: Content-Type`

## Common Issues

### "Workflow not active"
- Make sure you've clicked the **"Active"** toggle in n8n
- The workflow must be running for webhooks to work

### "404 Error"
- Verify the webhook URL is correct
- Make sure the workflow is active
- Check that the path matches in your `.env.local`

### "Still getting CORS errors"
- Clear your browser cache
- Check browser console for the exact error
- Verify the OPTIONS request is being handled
- Try testing from a production domain instead of localhost

## Quick Fix Checklist

- [ ] Workflow is **ACTIVE** in n8n
- [ ] Webhook node is configured for POST
- [ ] OPTIONS requests are handled (either via second webhook or IF node)
- [ ] "Respond to Webhook" node has CORS headers set
- [ ] Webhook URL in `.env.local` matches n8n
- [ ] Rebuilt the site after updating `.env.local`

