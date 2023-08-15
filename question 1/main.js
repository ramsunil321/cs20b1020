const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const API_BASE_URL = 'http://20.244.56.144';

app.post('/register', async (req, res) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/train/register`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.post('/authenticate', async (req, res) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/train/auth`, req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });

  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
