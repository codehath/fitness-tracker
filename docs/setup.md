# Setup Guide

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/codehath/fitness-tracker.git
cd fitness-tracker
```

### 2. Rename `.env.example`

Copy the `.env.example` file to `.env` to set up environment variables.

```bash
cp .env.example .env
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

---