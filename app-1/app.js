const express = require('express');
const axios = require('axios');
const AWSXRay = require('aws-xray-sdk');
const app = express();
const port = 3000; 

// app.use(express.static('public'));
// Use the X-Ray middleware
app.use(AWSXRay.express.openSegment('App1'));


app.get('/', (req, res) => {
    res.send('Hello, this is your app-1 website!');
});

app.get('/app-2', async(req, res) => {
    try {
        const response = await axios.get('http://app-2.service.local:3001');
        res.json(response.data);
      } catch (error) {
        console.error('Error making request:', error);
        res.status(500).send('Internal Server Error');
      }
});

app.use(AWSXRay.express.closeSegment());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});