# Setting Up Clerk Authentication

To set up authentication with Clerk, follow these steps:

## 1. Create a Clerk Account

- Go to [clerk.dev](https://clerk.dev) and sign up for an account if you don't already have one
- Log in to your Clerk account

## 2. Create a New Application

- From your Clerk dashboard, click "Add Application"
- Configure your application settings as needed
- Create the application

## 3. Get Your API Keys

- Click on Configure tab in the Clerk dashboard
- Under the Developer section, click on API Keys in the sidebar
- Copy your Publishable Key
- Open the `.env` file in the `client` directory
- Paste your API key as the value for `VITE_CLERK_PUBLISHABLE_KEY`
- The line should look like:
  ```bash
  VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
  ```

## 4. Set up ngrok

Follow the instructions [here](/docs/setup-ngrok.md) to set up ngrok
Copy your ngrok URL and for the next steps

## 5. Configure Webhooks

Navigate to "Webhooks" in the Clerk dashboard sidebar

### Add the Create User Webhook

- Click "Add Endpoint"
- Set the endpoint URL to your ngrok URL + `/api/webhooks/clerk/create`

  Example:

  ```bash
  https://your-ngrok-url.ngrok.io/api/webhooks/clerk/create
  ```

- Enable the `user.created` webhook event:
- Click "Create"

### Add the Delete User Webhook

- Click "Add Endpoint" again
- Set the endpoint URL to your ngrok URL + `/api/webhooks/clerk/delete`  
  Example:
  ```bash
  https://your-ngrok-url.ngrok.io/api/webhooks/clerk/delete
  ```
- Enable the `user.deleted` webhook event:
- Click "Create"

## Important Notes

- Your ngrok URL will change each time you restart ngrok
- You must update the webhook URL in Clerk when your ngrok URL changes
- Each developer needs their own:
  - Clerk account
  - Application setup
  - ngrok configuration

Your Clerk authentication is now configured and ready to use!
