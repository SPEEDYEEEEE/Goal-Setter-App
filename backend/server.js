const dotenv = require('dotenv').config();

if (dotenv.error) {
  throw dotenv.error;
}

const express = require('express');
const colors = require('colors');
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();
const app = express();

// Accepting body data
app.use(express.json());
// Accept URL
app.use(express.urlencoded({ extended: false }));

// Using goals and users routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Using custom errorHandler to overwrite express errorHandler
app.use(errorHandler);

// Server Port
app.listen(port, () => console.log(`Server started on port ${port}`));
