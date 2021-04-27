/* eslint-disable no-unused-vars */
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 8080;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  // eslint-disable-next-line node/no-path-concat
  res.sendFile(path.join(__dirname + '/web_pages/index.html'));
});

app.listen(port, (e) => {
  console.log(`server ${e ? 'failed to start' : `listening on port ${port}`}`);
});

app.post("/upload-files", )