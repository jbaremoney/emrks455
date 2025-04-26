const allergyModel = require('./allergiesModel');
 
exports.getAllergiesByPatient = async (req, res) => {
  const { ssn } = req.params;
  try {
    const allergies = await allergyModel.getAllergiesByPatient(ssn);
    res.json(allergies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addAllergy = async (req, res) => {
  const { ssn } = req.params;
  const { allergen } = req.body;
  try {
    await allergyModel.addAllergy(ssn, allergen);
    res.status(201).json({ message: 'Allergy added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAllergy = async (req, res) => {
  const { ssn, allergen } = req.params;
  try {
    await allergyModel.deleteAllergy(ssn, allergen);
    if (result.affectedRows > 0) {
      res.json({ message: 'Allergy deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Allergy not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
