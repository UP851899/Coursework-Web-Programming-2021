const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8080;
const DB_PATH = ':memory:';

app.listen(port, (e) => {
  console.log(`server ${e ? 'failed to start' : `listening on port ${port}`}`);
});

// Database
// eslint-disable-next-line no-unused-vars
const DB = new sqlite3.Database(DB_PATH, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected to database: ' + DB_PATH);
});

// Get webpages
app.use(express.json());
app.use('/', express.static('web_pages'));

// Storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './files');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

// Upload
const upload = multer({ storage: fileStorage });

app.post('/upload-files', upload.array('multiFiles', 25),
  function (req, res, err) {
    if (err) {
      console.log('error');
      console.log(err);
    }
    res.end();
    console.log(req.files);
  });
