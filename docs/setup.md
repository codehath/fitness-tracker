# Setup Guide

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/codehath/fitness-tracker.git
cd fitness-tracker
```

### 2. Set Up Environment Variables

You'll need to set up environment variables for both the root directory and the client directory.

#### **Root Directory**

Copy the root `.env.example` file:

```bash
cp .env.example .env
```

#### **Client Directory**

Navigate to the client directory and copy its `.env.example` file:

```bash
cd client
cp .env.example .env
```

### 3. Set Up Clerk Authentication

1. Create a Clerk account at [clerk.dev](https://clerk.dev)
2. Create a new application in your Clerk dashboard
3. Get your Publishable Key from the Clerk dashboard
4. Add it to your client/.env file:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

Then return to the root directory:

```bash
cd ..
```

### 4. Install Dependencies

Install the required dependencies for both the root and the client directories.

#### **Root Directory**

```bash
npm install
```

#### **Client Directory (Frontend)**

```bash
cd client
npm install
cd ..
```

### 5. Set Up and Seed the Database

First, ensure the shell script has execute permission:

```bash
chmod +x create_seed_db.sh
```

Then run the script to create and seed the MongoDB database:

```bash
sh create_seed_db.sh
```

### 6. Set Up Ngrok and Webhooks

This step is essential for development as it allows Clerk's webhooks to reach your local server:

1. Install ngrok:

```bash
npm install -g ngrok
```

2. Authenticate ngrok (one-time setup):

   - Sign up at [ngrok.com](https://ngrok.com)
   - Get your authtoken from the ngrok dashboard
   - Run: `ngrok config add-authtoken your_token_here`

3. Start ngrok in a new terminal:

```bash
ngrok http 3000
```

4. Configure Webhooks in Clerk:
   - Go to your Clerk Dashboard
   - Navigate to Webhooks in the sidebar
   - Click "Add Endpoint"
   - Use your ngrok URL + `/api/v1/webhooks/clerk`
     Example: `https://your-ngrok-url.ngrok.io/api/v1/webhooks/clerk`
   - Select these events:
     - user.created
     - user.deleted
     - user.updated

**Important Notes:**

- The ngrok URL changes each time you restart ngrok
- You'll need to update the webhook URL in your Clerk dashboard whenever you restart ngrok
- Each developer needs their own Clerk account and ngrok setup

### 7. Running the Application

Start the full application:

```bash
npm run start
```

Or run backend and frontend separately:

#### **Backend (Server)**

```bash
cd server
node index.js
```

#### **Frontend (Client)**

```bash
cd client
npm run dev
```

The app should now be running and accessible locally.

---
