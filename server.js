// createRequire needed to solver issues with module
import { createRequire } from 'module';
import * as db from './fileStorage.js';
import * as compare from './modules/compare.js';

const require = createRequire(import.meta.url);
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 8080;
const path = './files';

// Console log for server start
app.listen(port, (e) => {
  console.log(`server ${e ? 'failed to start' : `listening on port ${port}`}`);
});

// Get webpages
app.use(express.json());
app.use('/', express.static('web_pages', { extensions: ['html'] }));
app.set('view engine');

// ----------- \\
// File Upload \\
// ----------- \\

!fs.existsSync(path) && fs.mkdirSync(path); // Checks if path exists, if not creates

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Upload using multer \\

const upload = multer({ storage: fileStorage });

// Post function from HTML
app.post('/upload-files', upload.array('multiFiles', 50), // Set max # files to upload as 50 currently
  function (req, res, err) {
    if (err) {
      console.log('error');
      console.log(err);
    }
    db.uploadToDB(req.files);
    res.redirect('/');
  });

// ---------------- \\
// Database queries \\
// ---------------- \\

async function getFileNames(req, res) {
  let result = [];
  result = await db.getNames();
  return res.json(result);
}

async function getFilePaths(req, res) {
  let result = [];
  result = await db.getPaths();
  return res.json(result);
}

async function getComparison(req, res) {
  const result = await compare.comparison(req.body.fileOne, req.body.fileTwo);
  return res.json(result);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/filenames', asyncWrap(getFileNames));
app.get('/filepaths', asyncWrap(getFilePaths));
app.post('/compareResults', express.json(), asyncWrap(getComparison));
