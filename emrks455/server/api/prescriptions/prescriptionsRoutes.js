const express = require('express');
const router = express.Router();
const prescriptionsController = require('./prescriptionsController');

// Get prescription by ID
router.get('/:id', prescriptionsController.getPrescriptionById);

// Create new prescription
router.post('/', prescriptionsController.createPrescription);

// Assign prescription to patient
router.post('/:id/assign', prescriptionsController.assignPrescription);

// Get all prescriptions for a patient


module.exports = router;
