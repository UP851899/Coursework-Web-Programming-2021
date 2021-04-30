const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
// .verbose() used for additional log info, in case of troubleshooting

const app = express();
const port = 8080;

app.listen(port, (e) => {
  console.log(`server ${e ? 'failed to start' : `listening on port ${port}`}`);
});

// Database \\

// Open in memory
// eslint-disable-next-line no-unused-vars
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Connected to memory db');
});

// Close db
// db.close((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Closed db connection');
// });

// Get webpages
app.use(express.json());
app.use('/', express.static('web_pages', { extensions: ['html'] }));
app.set('view engine');

// File Upload \\

// File storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './files');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Upload using multer
const upload = multer({ storage: fileStorage });

app.post('/upload-files', upload.array('multiFiles', 25),
  function (req, res, err) {
    if (err) {
      console.log('error');
      console.log(err);
    }
    console.log(req.files);

    res.redirect('/');
  });
