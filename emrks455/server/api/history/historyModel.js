const pool = require('../../config/db');

exports.getMedicalHistoryBySSN = async (ssn) => {
  const [rows] = await pool.query(
    'SELECT * FROM PatientMedicalHistory WHERE patient_ssn = ?',
    [ssn]
  );
  return rows;
};
