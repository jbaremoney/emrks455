const express = require('express');
const router = express.Router();
const claimsController = require('./claimsController');

// Create a new claim
router.post('/', claimsController.createClaim);

// Update a claim status
router.put('/:id', claimsController.updateClaimStatus);

module.exports = router;
