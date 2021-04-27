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
