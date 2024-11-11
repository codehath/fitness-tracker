#!/bin/bash

# Define variables
DB_NAME="fitness-app"   # Replace with your MongoDB database name
SEED_FILE="seed.js"      # Replace with your seed file path
MONGO_URI="mongodb://localhost:27017"  # Replace with your MongoDB URI if different

# Step 1: Drop the database if it exists
echo "Dropping database $DB_NAME if it exists..."
mongosh $MONGO_URI --eval "db.getSiblingDB('$DB_NAME').dropDatabase()"

# Step 2: Create the database (MongoDB will auto-create it when data is inserted)
echo "Database $DB_NAME created."

# Step 3: Run the seed file
# echo "Running the seed file..."
# mongo $MONGO_URI/$DB_NAME $SEED_FILE

# echo "Database $DB_NAME has been seeded."
