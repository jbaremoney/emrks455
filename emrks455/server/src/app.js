const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ THIS is what connects the routes
const patientRoutes = require('../api/patients/patientRoutes');
const appointmentsRoutes = require('../api/appointments/appointmentsRoutes');
const claimsRoutes = require('../api/claims/claimsRoutes');
const labsRoutes = require('../api/labs/labsRoutes');
const doctorRoutes = require('../api/medicalProfessionals/medicalRoutes');
const notesRoutes = require('../api/notes/notesRoute');
const prescriptionRoutes = require('../api/prescriptions/prescriptionsRoutes');

app.use('/api/patients', patientRoutes); // 👈 now this URL will work
app.use('/api/appointments', appointmentsRoutes); // 👈 now this URL will work
app.use('/api/claims', claimsRoutes);
app.use('/api/labs', labsRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});


// Optional: catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
