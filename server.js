const express = require('express');
const app = express();

app.listen(8080, (e) => {
  console.log(`server ${e ? 'failed to start' : 'listening'}`);
});
