const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000; 

app.use(express.static('public'));


app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(filePath);
});

app.get('/app-2', async(req, res) => {
    try {
        const response = await axios.get('http://localhost:3001');
        res.json(response.data);
      } catch (error) {
        console.error('Error making request:', error);
        res.status(500).send('Internal Server Error');
      }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});