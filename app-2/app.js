const express = require('express');
const AWSXRay = require('aws-xray-sdk');
const path = require('path');
const app = express();
const port = 3001;

// app.use(express.static('public'));
// Use the X-Ray middleware
app.use(AWSXRay.express.openSegment('App2'));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(filePath);
});

// Close the X-Ray segment after the response is sent
app.use(AWSXRay.express.closeSegment());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});