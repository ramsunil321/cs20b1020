const axios = require('axios');

const API_AUTH_URL = 'http://20.244.56.144/train/auth';

const authData = {
  companyName: 'Train Central',
  clientID: 'b46118f0-fbde-4b16-a4b1-6ae6ad718b27',
  ownerName: 'Rahul',
  ownerEmail: 'cs20b1020@iiitdm.ac.in',
  rollNo: '1',
  clientSecret: 'XOyolORPasKWODAN',
};

async function authenticateCompany() {
    try {
      const response = await axios.post(API_AUTH_URL, authenticationData);
      if (response.status === 200) {
        const authToken = response.data.access_token;
        console.log('Authentication Successful');
        console.log('Authorization Token:', authToken);
       
      }
    } catch (error) {
      console.error('Error authenticating company:', error.response.data);
    }
  }
  
  authenticateCompany();
  
