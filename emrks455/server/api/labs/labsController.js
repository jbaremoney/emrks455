const labsModel = require('./labsModel');

// Get lab test by ID
exports.getLabById = async (req, res) => {
  try {
    const { id } = req.params;
    const lab = await labsModel.getLabById(id);
    if (!lab) return res.status(404).json({ error: 'Lab test not found' });
    res.json(lab);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get lab test' });
  }
};

// Create new lab test
exports.createLabTest = async (req, res) => {
  try {
    const { result } = req.body;
    const id = await labsModel.createLabTest(result);
    res.status(201).json({ message: 'Lab test created', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create lab test' });
  }
};

// Assign lab test to patient
exports.assignLabToPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientSSN, medicalSSN } = req.body;
    await labsModel.assignLabToPatient(id, patientSSN, medicalSSN);
    res.json({ message: 'Lab assigned to patient' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to assign lab test' });
  }
};

// Get all labs for a patient
exports.getLabsByPatientSSN = async (req, res) => {
  try {
    const { ssn } = req.params;
    const labs = await labsModel.getLabsByPatientSSN(ssn);
    res.json(labs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get patient labs' });
  }
};
