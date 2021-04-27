/* eslint-disable no-unused-vars */
const express = require('express');
const multer = require('multer');
const path = require('path');

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
  destination: function (req, file, cb) {
    cb(null, 'files/');
  },

  // adds file extension back to file name
  filename: function (req, file, cb) {
    cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
  },
});

// upload files
app.post('/upload-files', (req, res) => {
  // set current upload limit to 50
  const upload = multer({ storage: storage }).array('multiple-files', 50);

  upload(req, res, function (err) {
    if (!req.file) {
      return res.send('Please select a file to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    let result = 'You have uploaded these files: <hr />';
    const files = req.files;
    let index, len;

    // eslint-disable-next-line no-restricted-syntax
    for (index = 0, len = files.length; index < len; ++index) {
      result += `<img src="${files[index].path}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./">Upload more images</a>';
    res.send(result);
  });
});
