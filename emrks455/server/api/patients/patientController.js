const patientModel = require('./patientModel'); 

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.getAllPatients();
    res.json(patients);
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

exports.authPatient = async (req, res) => {
  try {
    const { username, password } = req.body;

    const authResp = await patientModel.authPatient(username, password);

    if (authResp !== 0) {
      res.status(200).json({ ssn: authResp });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error in authPatient controller:', err);
    res.status(500).json({ error: 'Problem validating patient' });
  }
};

// Get patient by SSN
exports.getPatientBySSN = async (req, res) => {
  try {
    const { ssn } = req.params;
    const patient = await patientModel.getPatientBySSN(ssn);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    console.error('Error fetching patient:', err);
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
};

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const { ssn, name, address, insurance } = req.body;
    await patientModel.createPatient(ssn, name, address, insurance);
    res.status(201).json({ message: 'Patient created successfully' });
  } catch (err) {
    console.error('Error creating patient:', err);
    res.status(500).json({ error: 'Failed to create patient' });
  }
};

// Update a patient
exports.updatePatient = async (req, res) => {
  try {
    const { ssn } = req.params;
    const { name, address, insurance } = req.body;
    const updated = await patientModel.updatePatient(ssn, name, address, insurance);
    if (updated.affectedRows === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json({ message: 'Patient updated successfully' });
  } catch (err) {
    console.error('Error updating patient:', err);
    res.status(500).json({ error: 'Failed to update patient' });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  try {
    const { ssn } = req.params;
    const deleted = await patientModel.deletePatient(ssn);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    console.error('Error deleting patient:', err);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};

exports.getPatientMedicalHistory = async (req, res) => {
  try {
    const { ssn } = req.params;
    const history = await patientModel.getPatientMedicalHistory(ssn);
    res.json(history);
  } catch (err) {
    console.error('Error fetching patient medical history:', err);
    res.status(500).json({ error: 'Failed to fetch medical history' });
  }
};