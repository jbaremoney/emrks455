const express = require('express');
const router = express.Router();
const patientController = require('./patientController');


// Get all patients
router.get('/', patientController.getAllPatients);

// Get a single patient by SSN
router.get('/:ssn', patientController.getPatientBySSN);

// Create a new patient
router.post('/', patientController.createPatient);

// Update an existing patient
router.put('/:ssn', patientController.updatePatient);

// Delete a patient
router.delete('/:ssn', patientController.deletePatient);

module.exports = router;