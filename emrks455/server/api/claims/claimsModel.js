const pool = require('../../config/db');

// Get all claims for a patient
exports.getClaimsByPatient = async (ssn) => {
  const [rows] = await pool.query(
    'SELECT * FROM Claim WHERE patient_ssn = ?',
    [ssn]
  );
  return rows;
};

// Create a new claim
exports.createClaim = async (patient_ssn, medical_ssn, amount, status = 'Pending') => {
  const [result] = await pool.query(
    'INSERT INTO Claim (patient_ssn, medical_ssn, amount, status) VALUES (?, ?, ?, ?)',
    [patient_ssn, medical_ssn, amount, status]
  );
  return result.insertId;
};

// Update claim status
exports.updateClaimStatus = async (id, status) => {
  const [result] = await pool.query(
    'UPDATE Claim SET status = ? WHERE id = ?',
    [status, id]
  );
  return result;
};
