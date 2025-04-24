const express = require('express');
const router = express.Router();
const labsController = require('./labsController');

// Get lab by ID
router.get('/:id', labsController.getLabById);

// Create lab test
router.post('/', labsController.createLabTest);

// Assign lab to patient
router.post('/:id/assign', labsController.assignLabToPatient);

module.exports = router;
