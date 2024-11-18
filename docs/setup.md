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

You'll need to:

1. Get your Clerk publishable key from the Clerk dashboard
2. Add it to client/.env as VITE_CLERK_PUBLISHABLE_KEY

Then return to the root directory:

```bash
cd ..
```

### 3. Install Dependencies

Install the required dependencies for both the root and the client directories.

#### **Root Directory**

```bash
npm install
```

#### **Client Directory (Frontend)**

Navigate to the client folder and install the dependencies:

```bash
cd client
npm install
cd ..
```

### 4. Activate Shell Script

Ensure that the shell script has execute permission. You can grant execute permissions using the following command:

```bash
chmod +x create_seed_db.sh
```

### 5. Set Up and Seed the Database

Run the shell script to create and seed the MongoDB database. This script will delete the existing database (if any), create a new one, and populate it with initial data.

```bash
sh create_seed_db.sh
```

### 6. Running the Application

Once the database is set up, you can start the application:

```bash
npm run start
```

Alternatively you can start the backend and frontend separately:

#### **Backend (Server)**

```bash
cd server
node index.js
```

#### **Frontend (Client)**

Navigate to the client folder and run the development server:

```bash
cd client
npm run dev
```

The app should now be running and accessible locally.

### 7. Setting Up Ngrok (for Development)

To test webhooks locally, you'll need to use ngrok. This step is only necessary if you're working with webhooks in development:

1. Install ngrok:

```bash
npm install -g ngrok
```

2. In a new terminal, create a secure tunnel to your backend:

```bash
ngrok http 3000
```

3. Copy the HTTPS URL provided by ngrok (e.g., https://1234-your-url.ngrok.io)

4. Use this URL in your webhook configuration settings

Note: The ngrok URL changes each time you restart ngrok, so you'll need to update your webhook settings with the new URL when this happens.

---
