const express = require('express');
const router = express.Router({ mergeParams: true }); // 👈 Needed for nested routes
const allergyController = require('./allergiesController');

router.get('/', allergyController.getAllergiesByPatient);
router.post('/', allergyController.addAllergy);
router.delete('/:allergen', allergyController.deleteAllergy);

module.exports = router;
