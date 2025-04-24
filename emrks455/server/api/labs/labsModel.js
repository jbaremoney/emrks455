const pool = require('../../config/db');

// Get lab test by ID
exports.getLabById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM LabTest WHERE id = ?', [id]);
  return rows[0];
};

// Create new lab test
exports.createLabTest = async (result) => {
  const [res] = await pool.query(
    'INSERT INTO LabTest (result) VALUES (?)',
    [result]
  );
  return res.insertId;
};

// Assign lab test to patient (Give_Result)
exports.assignLabToPatient = async (testId, patientSSN, medicalSSN) => {
  await pool.query(
    'INSERT INTO Give_Result (test_id, patient_ssn, medical_ssn) VALUES (?, ?, ?)',
    [testId, patientSSN, medicalSSN]
  );
};

// Get all labs for a patient
exports.getLabsByPatientSSN = async (ssn) => {
  const [rows] = await pool.query(
    `SELECT lt.id, lt.result, lt.ordered_at
     FROM LabTest lt
     JOIN Give_Result gr ON lt.id = gr.test_id
     WHERE gr.patient_ssn = ?`,
    [ssn]
  );
  return rows;
};
