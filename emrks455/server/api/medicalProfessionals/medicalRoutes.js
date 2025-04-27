const express = require('express');
const router = express.Router();
const medicalController = require('./medicalController');
const appointmentsController = require('../appointments/appointmentsController');


// Routes for medical professionals
router.get('/', medicalController.getAllDoctors);
router.get('/:ssn', medicalController.getDoctorBySSN);
router.post('/', medicalController.createDoctor);
router.put('/:ssn', medicalController.updateDoctor); 
router.delete('/:ssn', medicalController.deleteDoctor);

// Get all appointments for a medical professional
router.get('/:ssn/appointments', appointmentsController.getAppointmentsForDoctor);

router.post('/auth', medicalController.authDoctor);

module.exports = router;
