# Setup Guide

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/codehath/fitness-tracker.git
cd fitness-tracker
```

### 2. Set Up Environment Variables

You'll need to set up environment variables for both the root directory and the client directory.

#### **Server Directory**

Navigate to the server directory and copy its `.env.example` file:

```bash
cd server
cp .env.example .env
```

#### **Client Directory**

Navigate to the client directory and copy its `.env.example` file:

```bash
cd client
cp .env.example .env
```

### 3. Set Up External Services and Get API Keys

Set up Clerk, ngrok, your webhooks in Clerk and RapidAPI:
[Clerk Setup](/docs/setup-clerk.md)
[Ngrok Setup](/docs/setup-ngrok.md)
[Clerk Webhooks Setup (Step 5)](/docs/setup-clerk.md)
[RapidAPI Setup](/docs/setup-rapidapi.md)
[Stripe Setup](/docs/setup-stripe.md)

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

#### **Server Directory (Backend)**

```bash
cd server
npm install
cd ..
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

### 6. Running the Application

Start the full application:

```bash
npm run start
```

Or run backend and frontend separately:

#### **Backend (Server)**

```bash
npm run server
```

or

```bash
cd server
node index.js
```

#### **Frontend (Client)**

```bash
npm run client
```

or

```bash
cd client
npm run dev
```

The app should now be running and accessible locally.

---
