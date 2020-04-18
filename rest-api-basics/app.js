const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv/config');
const unitsRoutes = require('./routes/units');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

// Middlewares

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/posts', (request, response, next) => {
//   console.log('This is a middleware');
//   next();
// });

// ROUTES

app.get('/', (request, response) => {
  response.send('We are on home');
});

app.use('/api/units', unitsRoutes);
// Connext to db
console.log(process.env.DB_CONNECTION)
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to db'));


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
