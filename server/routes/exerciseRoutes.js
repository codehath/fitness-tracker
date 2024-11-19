require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Cache configuration
const NodeCache = require('node-cache');
const cache = new NodeCache({
  stdTTL: 36000, // Default TTL of 10 hour
  checkperiod: 6000, // Check for expired entries every 100 minutes
});

// API endpoint to view cache contents
router.get('/exercises/cache-contents', (req, res) => {
  const keys = cache.keys();
  const cacheContents = keys.map((key) => ({
    key,
    value: cache.get(key),
  }));
  res.json(cacheContents);
});

// Helper function for making API requests with caching
const makeExerciseApiRequest = async (endpoint = '', params = {}) => {
  // Create a unique cache key based on endpoint and params
  const cacheKey = `${endpoint}-${JSON.stringify(params)}`;

  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Cache HIT for key: ${cacheKey}`);
    return cachedData;
  }
  console.log(`Cache MISS for key: ${cacheKey}`);

  const url = `${process.env.EXERCISE_API_BASE_URL}${endpoint}`;
  const headers = {
    'x-rapidapi-host': process.env.EXERCISE_API_HOST,
    'x-rapidapi-key': process.env.EXERCISE_API_KEY,
  };

  try {
    console.log(`Making API request to: ${url}`);
    console.log('Request params:', params);

    const response = await axios.get(url, { headers, params });

    console.log(`API request successful. Status: ${response.status}`);
    console.log(`Caching response data with key: ${cacheKey}`);

    // Store in cache before returning
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Exercise API Error:', error);
    console.error('Request details:', {
      url,
      params,
      headers: { ...headers, 'x-rapidapi-key': '[REDACTED]' },
    });
    throw error;
  }
};

// Get all exercises
router.get('/exercises', async (req, res) => {
  try {
    const data = await makeExerciseApiRequest('', {
      limit: 10,
      offset: 0,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// Get exercise by ID
router.get('/exercise/:id', async (req, res) => {
  try {
    const data = await makeExerciseApiRequest(`/exercise/${req.params.id}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercise' });
  }
});

// Get exercises by name
router.get('/exercises/name/:name', async (req, res) => {
  try {
    const data = await makeExerciseApiRequest(`/name/${req.params.name}`, {
      limit: 10,
      offset: 0,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// Get exercises by bodypart
router.get('/exercises/bodypart/:bodypart', async (req, res) => {
  try {
    const data = await makeExerciseApiRequest(
      `/bodyPart/${req.params.bodypart}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// Get exercises by target muscle
router.get('/exercises/muscle/:muscle', async (req, res) => {
  try {
    const data = await makeExerciseApiRequest(`/target/${req.params.muscle}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// Get exercises by equipment
router.get('/exercises/equipment/:equipment', async (req, res) => {
  try {
    const data = await makeExerciseApiRequest(
      `/equipment/${req.params.equipment}`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// Get list of all bodyparts
router.get('/exercises/bodyPartList', async (req, res) => {
  try {
    const data = await makeExerciseApiRequest('/bodyPartList');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bodypart list' });
  }
});

// Get list of all equipment
router.get('/exercises/equipmentList', async (req, res) => {
  try {
    const data = await makeExerciseApiRequest('/equipmentList');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment list' });
  }
});

module.exports = router;
