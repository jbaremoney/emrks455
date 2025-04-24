const doctorModel = require('./medicalModel');

// Get all medical professionals
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.getAllDoctors();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch medical professionals' });
  }
};

// Get specific medical professional
exports.getDoctorBySSN = async (req, res) => {
  try {
    const { ssn } = req.params;
    const doctor = await doctorModel.getDoctorBySSN(ssn);
    if (!doctor) return res.status(404).json({ error: 'Medical professional not found' });
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch medical professional' });
  }
};

// Create a medical professional
exports.createDoctor = async (req, res) => {
  try {
    const { ssn, name, specialty, address } = req.body;
    await doctorModel.createDoctor(ssn, name, specialty, address);
    res.status(201).json({ message: 'Medical professional created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create medical professional' });
  }
};

// Update a medical professional
exports.updateDoctor = async (req, res) => {
  try {
    const { ssn } = req.params;
    const { name, specialty, address } = req.body;
    await doctorModel.updateDoctor(ssn, name, specialty, address);
    res.json({ message: 'Medical professional updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update medical professional' });
  }
};

// Delete a medical professional
exports.deleteDoctor = async (req, res) => {
  try {
    const { ssn } = req.params;
    await doctorModel.deleteDoctor(ssn);
    res.json({ message: 'Medical professional deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete medical professional' });
  }
};
