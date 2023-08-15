const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'No URLs provided.' });
  } 

  const validUrls = Array.isArray(urls) ? urls : [urls];

  try {
    const promises = validUrls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers;
      } catch (error) {
        console.error(`Error fetching numbers from ${url}:`, error.message);
        return [];
      }
    });

    const results = await Promise.allSettled(promises);
    const mergedNumbers = results
      .filter((result) => result.status === 'fulfilled')
      .flatMap((result) => result.value);

    const uniqueSortedNumbers = Array.from(new Set(mergedNumbers)).sort((a, b) => a - b);

    return res.json({ numbers: uniqueSortedNumbers });
  } catch (error) {
    console.error('Error processing URLs:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
