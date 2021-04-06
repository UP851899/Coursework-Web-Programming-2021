/* eslint-disable no-unused-vars */
const express = require('express');
const config = require('./config.json');

const app = express();

app.listen(8080, (e) => {
  console.log(`server ${e ? 'failed to start' : 'listening'}`);
});

// Get webpages
app.use(express.json());
app.use('/', express.static('web_pages'));
