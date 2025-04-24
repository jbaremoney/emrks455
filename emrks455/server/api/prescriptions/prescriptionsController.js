const prescriptionsModel = require('./prescriptionsModel');

// Get prescription by ID
exports.getPrescriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await prescriptionsModel.getPrescriptionById(id);
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get prescription' });
  }
};

// Create new prescription
exports.createPrescription = async (req, res) => {
  try {
    const { drug, amount } = req.body;
    const id = await prescriptionsModel.createPrescription(drug, amount);
    res.status(201).json({ message: 'Prescription created', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create prescription' });
  }
};

// Assign prescription to patient
exports.assignPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientSSN, medicalSSN } = req.body;
    await prescriptionsModel.assignPrescription(id, patientSSN, medicalSSN);
    res.json({ message: 'Prescription assigned to patient' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to assign prescription' });
  }
};

// Get prescriptions for a patient
exports.getPrescriptionsByPatient = async (req, res) => {
  try {
    const { ssn } = req.params;
    const prescriptions = await prescriptionsModel.getPrescriptionsByPatient(ssn);
    res.json(prescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get prescriptions for patient' });
  }
};
