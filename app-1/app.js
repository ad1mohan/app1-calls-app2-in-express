const express = require('express');
const axios = require('axios');
const path = require('path');
const AWSXRay = require('aws-xray-sdk');
const app = express();
const port = 3000; 

// app.use(express.static('public'));
// Use the X-Ray middleware
app.use(AWSXRay.express.openSegment('App1'));


app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');

  // Send the HTML file as the response
  res.sendFile(filePath);
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