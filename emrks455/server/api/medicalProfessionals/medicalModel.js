const pool = require('../../config/db');

// Get all medical professionals
exports.getAllDoctors = async () => {
  const [rows] = await pool.query('SELECT * FROM MedicalProfessional');
  return rows;
};

exports.authDoctor = async (email, password) => {
  try {
    const [rows] = await pool.query(
      'SELECT ssn FROM MedicalProfessional WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length !== 0) {
      return rows[0].ssn;
    } else {
      return 0;
    }
  } catch (err) {
    console.error('Error authenticating professional:', err);
    throw err;
  }
};

// Get specific medical professional by SSN
exports.getDoctorBySSN = async (ssn) => {
  const [rows] = await pool.query('SELECT * FROM MedicalProfessional WHERE ssn = ?', [ssn]);
  return rows[0];
};

// Create new medical professional
exports.createDoctor = async (ssn, name, specialty, address) => {
  const [res] = await pool.query(
    'INSERT INTO MedicalProfessional (ssn, name, specialty, address) VALUES (?, ?, ?, ?)',
    [ssn, name, specialty, address]
  );
  return res.insertId;
};

// Update medical professional by SSN
exports.updateDoctor = async (ssn, name, specialty, address) => {
  await pool.query(
    'UPDATE MedicalProfessional SET name = ?, specialty = ?, address = ? WHERE ssn = ?',
    [name, specialty, address, ssn]
  );
};

// Delete medical professional by SSN
exports.deleteDoctor = async (ssn) => {
  await pool.query('DELETE FROM MedicalProfessional WHERE ssn = ?', [ssn]);
};
