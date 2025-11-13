#!/bin/bash

# Test script for n8n webhook CORS
# Replace WEBHOOK_URL with your actual webhook URL

WEBHOOK_URL="https://aibotsy.app.n8n.cloud/webhook-test/1c74962a-9286-4953-861c-28b28e9e4824"

echo "Testing OPTIONS (preflight) request..."
echo "----------------------------------------"
curl -X OPTIONS "$WEBHOOK_URL" \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v

echo ""
echo ""
echo "Testing POST request..."
echo "----------------------------------------"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "message": "Test message",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "source": "contact-form"
  }' \
  -v

