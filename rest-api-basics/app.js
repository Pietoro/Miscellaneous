const express = require('express');

const app = express();
const PORT = 3000;

// Middlewares

// app.use('/posts', (request, response, next) => {
//   console.log('This is a middleware');
//   next();
// });

// ROUTES

app.get('/', (request, response) => {
  response.send('We are on home');
});

app.get('/posts', (request, response) => {
  response.send('We are on posts');
});

app.listen(PORT);
