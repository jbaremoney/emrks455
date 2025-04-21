const pool = require('../../config/db');

// Get all patients
exports.getAllPatients = async () => {
  const [rows] = await pool.query('SELECT * FROM Patient');
  return rows;
};

// Get patient by SSN
exports.getPatientBySSN = async (ssn) => {
  const [rows] = await pool.query('SELECT * FROM Patient WHERE ssn = ?', [ssn]);
  return rows[0];
};

// Create a new patient
exports.createPatient = async (ssn, name, address, insurance) => {
  await pool.query(
    'INSERT INTO Patient (ssn, name, address, insurance) VALUES (?, ?, ?, ?)',
    [ssn, name, address, insurance]
  );
};

// Update patient info
exports.updatePatient = async (ssn, name, address, insurance) => {
  const [result] = await pool.query(
    'UPDATE Patient SET name = ?, address = ?, insurance = ? WHERE ssn = ?',
    [name, address, insurance, ssn]
  );
  return result;
};

// Delete a patient
exports.deletePatient = async (ssn) => {
  const [result] = await pool.query('DELETE FROM Patient WHERE ssn = ?', [ssn]);
  return result;
};
