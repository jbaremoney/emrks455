const express = require('express');
const router = express.Router();
const patientController = require('./patientController');
const allergyRoutes = require('../allergies/allergiesRoutes');
const claimsController = require('../claims/claimsController'); // 👈 add this
const historyController = require('../history/historyController'); // 👈 add this at the top
const labsController = require('../labs/labsController');
const notesController = require('../notes/notesController');
const prescriptionsController = require('../prescriptions/prescriptionsController');


router.get('/', patientController.getAllPatients); // Get all patients
router.get('/:ssn', patientController.getPatientBySSN); // Get a single patient by SSN
router.post('/', patientController.createPatient); // Create a new patient
router.put('/:ssn', patientController.updatePatient); // Update an existing patient
router.delete('/:ssn', patientController.deletePatient); // Delete a patient

router.use('/:ssn/allergies', allergyRoutes); // 👈 attaches allergy routes under patient
router.get('/:ssn/claims', claimsController.getClaimsByPatient); // ✅ this is what you want
router.get('/:ssn/history', historyController.getMedicalHistoryBySSN);
router.get('/:ssn/labs', labsController.getLabsByPatientSSN);
router.get('/:ssn/notes', notesController.getNotesByPatientSSN);
router.get('/:ssn/prescriptions', prescriptionsController.getPrescriptionsByPatient);



module.exports = router;