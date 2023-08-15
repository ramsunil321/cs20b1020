const axios = require('axios');

const API_REGISTER_URL = 'http://20.244.56.144/train/register';


const registrationData = {
  companyName: 'Train Central',
  ownerName: 'Rahul',
  rollNo: '1',
  ownerEmail: 'cs20b1020@iiitdm.ac.in',
  accessCode: 'FKDLjg',
};

async function registerCompany() {
    try {
      const response = await axios.post(API_REGISTER_URL, registrationData);
      if (response.status === 200) {
        console.log('Registration Successful:', response.data);
        const clientID = response.data.clientID;
        const clientSecret = response.data.clientSecret;
      }
    } catch (error) {
      console.error('Error registering company:', error.response.data);
    }
  }
  
  registerCompany();
  
