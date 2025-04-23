const pool = require('../../config/db');

exports.getAllergiesByPatient = async (ssn) => {
  const [rows] = await pool.query('SELECT allergen FROM Allergy WHERE patient_ssn = ?', [ssn]);
  return rows;
};

exports.addAllergy = async (ssn, allergen) => {
  await pool.query('INSERT INTO Allergy (patient_ssn, allergen) VALUES (?, ?)', [ssn, allergen]);
};

exports.deleteAllergy = async (ssn, allergen) => {
  await pool.query('DELETE FROM Allergy WHERE patient_ssn = ? AND allergen = ?', [ssn, allergen]);
};
