const pool = require('../../config/db');

// Create a new admin note
exports.createNote = async (patientSSN, medicalSSN, note) => {
  const [res] = await pool.query(
    'INSERT INTO AdminNote (patient_ssn, medical_ssn, note) VALUES (?, ?, ?)',
    [patientSSN, medicalSSN, note]
  );
  return res.insertId;
};

// Get all notes for a patient
exports.getNotesByPatientSSN = async (ssn) => {
  const [rows] = await pool.query(
    'SELECT * FROM AdminNote WHERE patient_ssn = ? ORDER BY created_at DESC',
    [ssn]
  );
  return rows;
};
