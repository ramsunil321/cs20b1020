const express = require('express');
const trainData = require('./trainData'); 

const app = express();

// Process Train Data
function processTrainData(rawTrainData) {
  const currentTime = new Date();


  const filteredTrains = rawTrainData.filter(train => {
    const departureTime = new Date();
    departureTime.setHours(train.departureTime.Hours);
    departureTime.setMinutes(train.departureTime.Minutes);
    departureTime.setSeconds(train.departureTime.Seconds);
    
    const timeDifferenceInMinutes = Math.floor((departureTime - currentTime) / (1000 * 60));
    return timeDifferenceInMinutes > 30;
  });


  const processedTrains = filteredTrains.map(train => {
    const sleeperSeats = train.seatsAvailable.sleeper;
    const acSeats = train.seatsAvailable.AC;

  
    const updatedSleeperSeats = sleeperSeats - Math.floor(Math.random() * 10);
    const updatedAcSeats = acSeats - Math.floor(Math.random() * 5);

    const sleeperPrice = train.price.sleeper;
    const acPrice = train.price.AC;


    const updatedSleeperPrice = sleeperPrice + Math.floor(Math.random() * 10);
    const updatedAcPrice = acPrice + Math.floor(Math.random() * 20);

    return {
      ...train,
      seatsAvailable: {
        sleeper: updatedSleeperSeats,
        AC: updatedAcSeats,
      },
      price: {
        sleeper: updatedSleeperPrice,
        AC: updatedAcPrice,
      },
    };
  });

  
  const trainsWithDelays = processedTrains.map(train => {
    const delayedDepartureTime = new Date(train.departureTime);
    delayedDepartureTime.setMinutes(delayedDepartureTime.getMinutes() + train.delayedBy);
    return {
      ...train,
      departureTime: delayedDepartureTime,
    };
  });


  const sortedTrains = trainsWithDelays.sort((a, b) => {
    if (a.price.AC === b.price.AC) {
      if (a.seatsAvailable.sleeper === b.seatsAvailable.sleeper) {
        return b.departureTime - a.departureTime; 
      }
      return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper; 
    }
    return a.price.AC - b.price.AC; 
  });

  return sortedTrains;
}

app.get('/trains', async (req, res) => {
  try {
    const allTrains = await trainData.fetchAllTrains();
    const processedTrains = processTrainData(allTrains);
    res.status(200).json(processedTrains);
  } catch (error) {
    console.error('Error fetching and processing all trains:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/trains/:trainNumber', async (req, res) => {
  const trainNumber = req.params.trainNumber;
  try {
    const trainDetails = await trainData.fetchTrainDetailsByNumber(trainNumber);
    if (trainDetails === null) {
      res.status(404).json({ error: 'Train not found' });
    } else {
      res.status(200).json(trainDetails);
    }
  } catch (error) {
    console.error('Error fetching train details by number:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
