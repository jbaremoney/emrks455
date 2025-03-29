const express = require('express');
const cors = require('cors');
// const morgan = require('morgan'); // Optionally for logging
// const bodyParser = require('body-parser'); // Or just use express.json()

const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON bodies
// app.use(morgan('dev')); // if you want simple request logging

// Routes
app.use('/api/users', userRoutes);

// (Optional) Global error handler or 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
