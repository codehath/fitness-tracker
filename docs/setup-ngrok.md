# Setting Up Ngrok

This step is essential for development as it allows Clerk's webhooks to reach your local server:

## 1. Install ngrok:

```bash
npm install -g ngrok
```

## 2. Authenticate ngrok (one-time setup):

- Sign up at [ngrok.com](https://ngrok.com)
- Get your authtoken from the ngrok dashboard
- Run:

```bash
ngrok config add-authtoken your_token_here
```

## 3. Start ngrok in a new terminal:

```bash
ngrok http 5000
```

## 4. Configure Webhooks in Clerk:

Copy your ngrok URL and use it to [Configure Webhooks in Clerk](/docs/setup-clerk.md)

**Important Notes:**

- The ngrok URL changes each time you restart ngrok
- You'll need to update the webhook URL in your Clerk dashboard whenever you restart ngrok
- Each developer needs their own Clerk account and ngrok setup
