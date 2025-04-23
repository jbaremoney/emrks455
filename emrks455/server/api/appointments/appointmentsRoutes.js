const express = require('express');
const router = express.Router();
const appointmentsController = require('./appointmentsController');

// Get all appointments for a patient
router.get('/patient/:ssn', appointmentsController.getAppointmentsForPatient);

// Get all appointments for a medical professional
router.get('/doctor/:ssn', appointmentsController.getAppointmentsForDoctor);

// Get an appointments by id
router.get('/:id', appointmentsController.getAppointmentById);

// Create a new appointment
router.post('/', appointmentsController.createAppointment);

// Update an existing appointment
router.put('/:id', appointmentsController.updateAppointment);

// Delete an appointment
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;