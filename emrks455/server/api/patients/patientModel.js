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

exports.getPatientMedicalHistory = async (ssn) => {
  const conn = await pool.getConnection();

  try {
    const [labs] = await conn.query(`
      SELECT lt.id, lt.result, lt.ordered_at
      FROM LabTest lt
      JOIN Give_Result gr ON lt.id = gr.test_id
      WHERE gr.patient_ssn = ?
    `, [ssn]);

    const [appointments] = await conn.query(`
      SELECT a.id, a.start_time, a.end_time, a.location, a.notes
      FROM Appointment a
      JOIN Schedule_Appointment sa ON a.id = sa.appointment_id
      WHERE sa.patient_ssn = ?
    `, [ssn]);

    const [prescriptions] = await conn.query(`
      SELECT p.id, p.drug, p.amount, p.date
      FROM Prescription p
      JOIN Order_Prescription op ON p.id = op.prescription_id
      WHERE op.patient_ssn = ?
    `, [ssn]);

    const [notes] = await conn.query(`
      SELECT id, note, created_at
      FROM AdminNote
      WHERE patient_ssn = ?
    `, [ssn]);

    return { labs, appointments, prescriptions, notes };

  } finally {
    conn.release();
  }
};
