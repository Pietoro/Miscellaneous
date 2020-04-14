const express = require('express');

const app = express();
const PORT = 3000;
// ROUTES

app.get('/', (request, response) => {
  response.send('We are on home');
});

app.listen(PORT)
