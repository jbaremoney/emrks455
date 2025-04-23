const claimsModel = require('./claimsModel');

// GET: all claims for a specific patient
exports.getClaimsByPatient = async (req, res) => {
  try {
    const { ssn } = req.params;
    const claims = await claimsModel.getClaimsByPatient(ssn);
    res.json(claims);
  } catch (err) {
    console.error('Error fetching claims:', err);
    res.status(500).json({ error: 'Failed to fetch claims' });
  }
};

// POST: create a new claim
exports.createClaim = async (req, res) => {
  try {
    const { patient_ssn, medical_ssn, amount, status } = req.body;
    const id = await claimsModel.createClaim(patient_ssn, medical_ssn, amount, status);
    res.status(201).json({ message: 'Claim created', claim_id: id });
  } catch (err) {
    console.error('Error creating claim:', err);
    res.status(500).json({ error: 'Failed to create claim' });
  }
};

// PUT: update claim status
exports.updateClaimStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await claimsModel.updateClaimStatus(id, status);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.json({ message: 'Claim status updated' });
  } catch (err) {
    console.error('Error updating claim:', err);
    res.status(500).json({ error: 'Failed to update claim' });
  }
};
