const axios = require('axios');

const authToken = 'YOUR_AUTH_TOKEN'; 

const API_BASE_URL = 'http://20.244.56.144'; 
const API_GET_ALL_TRAINS = `${API_BASE_URL}/train/trains`;

// Fetch All Trains
async function fetchAllTrains() {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axios.get(API_GET_ALL_TRAINS, { headers });
    if (response.status === 200) {
      const allTrains = response.data;
      return allTrains;
    }
  } catch (error) {
    console.error('Error fetching all trains:', error.response.data);
    return [];
  }
}

// Fetch Train Details by Train Number
async function fetchTrainDetailsByNumber(trainNumber) {
  try {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const API_GET_TRAIN_DETAILS = `${API_BASE_URL}/train/trains/${trainNumber}`;
    const response = await axios.get(API_GET_TRAIN_DETAILS, { headers });
    if (response.status === 200) {
      const trainDetails = response.data;
      return trainDetails;
    }
  } catch (error) {
    console.error('Error fetching train details:', error.response.data);
    return null;
  }
}

module.exports = {
  fetchAllTrains,
  fetchTrainDetailsByNumber,
};
