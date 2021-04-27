const express = require('express');
const multer = require('multer');

const app = express();
const port = 8080;

app.listen(port, (e) => {
  console.log(`server ${e ? 'failed to start' : `listening on port ${port}`}`);
});

// Get webpages
app.use(express.json());
app.use('/', express.static('web_pages'));

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/files');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Upload
const upload = multer({ storage: storage });

app.post('/upload-files', upload.array('file', 50), (req, res) => {
  console.log(req.files);
  return res.send('Files uploaded');
});
