// createRequire needed to solver issues with module
import { createRequire } from 'module';
import * as db from './fileStorage.js';
const require = createRequire(import.meta.url);
const express = require('express');
const multer = require('multer');

const app = express();
const port = 8080;

app.listen(port, (e) => {
  console.log(`server ${e ? 'failed to start' : `listening on port ${port}`}`);
});

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

// Set max # files to upload as 50 currently
app.post('/upload-files', upload.array('multiFiles', 50),
  function (req, res, err) {
    if (err) {
      console.log('error');
      console.log(err);
    }
    db.uploadToDB(req.files);
    res.redirect('/');
  });

async function getFileNames(req, res) {
  let result = [];
  result = await db.getNames();
  console.log(result);
  return res.json(result);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/filenames', asyncWrap(getFileNames));
