const pool = require('../../config/db');

// Get prescription by ID
exports.getPrescriptionById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Prescription WHERE id = ?', [id]);
  return rows[0];
};

// Create new prescription
exports.createPrescription = async (drug, amount) => {
  const [res] = await pool.query(
    'INSERT INTO Prescription (drug, amount) VALUES (?, ?)',
    [drug, amount]
  );
  return res.insertId;
};

// Assign prescription to patient
exports.assignPrescription = async (prescriptionId, patientSSN, medicalSSN) => {
  await pool.query(
    `INSERT INTO Order_Prescription (prescription_id, patient_ssn, medical_ssn)
     VALUES (?, ?, ?)`,
    [prescriptionId, patientSSN, medicalSSN]
  );
};

// Get all prescriptions for a patient
exports.getPrescriptionsByPatient = async (ssn) => {
  const [rows] = await pool.query(
    `SELECT p.id, p.drug, p.amount, p.date
     FROM Prescription p
     JOIN Order_Prescription op ON p.id = op.prescription_id
     WHERE op.patient_ssn = ?`,
    [ssn]
  );
  return rows;
};
