#!/bin/bash

# Define variables
DB_NAME="fitness-app"   # Replace with your MongoDB database name
SEED_FILE="seed.js"      # Replace with your seed file path
MONGODB_URL="mongodb://localhost:27017"  # Replace with your MongoDB URI if different

# Step 1: Drop the database if it exists
echo "Dropping database $DB_NAME if it exists..."
mongosh $MONGODB_URL --eval "db.getSiblingDB('$DB_NAME').dropDatabase()"

# Step 2: Create the database (MongoDB will auto-create it when data is inserted)
echo "Database $DB_NAME created."

# Step 3: Run the seed file
echo "Running the seed file..."
node seed.js

echo "Database $DB_NAME has been seeded."
