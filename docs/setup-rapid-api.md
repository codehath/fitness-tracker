# Setting Up ExerciseDB API Access

To connect to the ExerciseDB API, you'll need to follow these steps:

## 1. Create a RapidAPI Account

- Go to [RapidAPI Marketplace](https://rapidapi.com/hub) and sign up for an account if you don't already have one
- Log in to your RapidAPI account

## 2. Subscribe to ExerciseDB API

- Search for ExerciseDB in the RapidAPI marketplace
- Navigate to the [ExerciseDB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) page
- Select the Basic (Free) plan
- Complete the subscription process

## 3. Get Your API Key

- On the ExerciseDB API page, click [Open Playground](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/playground/)
- Look for the `X-RapidAPI-Key` field - this is your API key
- Copy the API key value

## 4. Configure Your Environment

- Open the `.env` file in the `server` directory
- Paste your API key as the value for `EXERCISE_API_KEY`
- The line should look like:
  ```
  EXERCISE_API_KEY=your-api-key-here
  ```

Your ExerciseDB API connection is now configured and ready to use!
