const express = require('express');
const router = express.Router();
const medicalController = require('./medicalController');

// Routes for medical professionals
router.get('/', medicalController.getAllDoctors);
router.get('/:ssn', medicalController.getDoctorBySSN);
router.post('/', medicalController.createDoctor);
router.put('/:ssn', medicalController.updateDoctor); 
router.delete('/:ssn', medicalController.deleteDoctor);

module.exports = router;
