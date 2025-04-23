// const express = require('express');
// const cors = require('cors');
// // const morgan = require('morgan'); // Optionally for logging
// // const bodyParser = require('body-parser'); // Or just use express.json()

// const patientRoutes = require('../routes/patientRoutes');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json()); // parse JSON bodies
// // app.use(morgan('dev')); // if you want simple request logging

// // Routes
// app.use('/api/users', patientRoutes);

// // (Optional) Global error handler or 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// module.exports = app;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ THIS is what connects the routes
const patientRoutes = require('../api/patients/patientRoutes');
const appointmentsRoutes = require('../api/appointments/appointmentsRoutes');
const claimsRoutes = require('../api/claims/claimsRoutes');

app.use('/api/patients', patientRoutes); // 👈 now this URL will work
app.use('/api/appointments', appointmentsRoutes); // 👈 now this URL will work
app.use('/api/claims', claimsRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});


// Optional: catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
