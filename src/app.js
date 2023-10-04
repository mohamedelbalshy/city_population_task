const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL)
  .catch(console.log)
  .then(res => {
    console.log(`Mongodb connected succesfully!`);
  });


const middlewares = require('./middlewares');
const populationRouter = require('./api/PopulationApi');
const { readCSVFile } = require('./migrations/feed_city_population');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// wait for database connection
setTimeout(() => {
  // this function should only called once
  // readCSVFile();
}, 5000);

app.use('/api/population', populationRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;