Stripe Setup Guide

## 1. Create a Stripe Account

- Go to [Stripe's website](https://stripe.com) and sign up for an account if you don't have one.

## 2. Obtain API Keys

- After logging in to your Stripe dashboard, navigate to the **Developers** section.
- Under **API keys**, you will find your **Publishable key** and **Secret key**. Copy these keys.

## 3. Configure Environment Variables

- In your server's `.env` file, add the following lines:
  ```plaintext
  STRIPE_SECRET_KEY=your_secret_key_here
  STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
  ```
- Replace `your_secret_key_here` and `your_publishable_key_here` with the keys you copied from the Stripe dashboard.

## 4. Set Up Webhooks Using Stripe CLI

- Install the Stripe CLI if you haven't already. You can find installation instructions [here](https://stripe.com/docs/stripe-cli#install).
- Log in to your Stripe account using the CLI by running:
  ```bash
  stripe login
  ```
  - This command will open a browser window for you to authenticate with your Stripe account.
- After logging in, run the following command to listen for webhook events and forward them to your local server:
  ```bash
  stripe listen --forward-to http://localhost:${PORT}/api/webhook/stripe
  ```
  - Replace `${PORT}` with the port number specified in your server `.env` file. This allows the command to adapt to whatever port your backend is running on.

## 5. Test Your Integration

- Use the Stripe CLI to test your integration by triggering events and ensuring your webhook endpoint is receiving them correctly. You can trigger test events using:
  ```bash
  stripe trigger checkout.session.completed
  ```
