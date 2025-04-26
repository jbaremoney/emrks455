const appointmentsModel = require('./appointmentsModel');

exports.getAppointmentsForPatient = async (req, res) => {
    try {
      const { ssn } = req.params;
      const appointments = await appointmentsModel.getAppointmentsForPatient(ssn);
      res.json(appointments);
    } catch (err) {
      console.error('Error fetching patient appointments:', err);
      res.status(500).json({ error: 'Failed to fetch patient appointments' });
    }
  };
   
  exports.getAppointmentsForDoctor = async (req, res) => {
    try {
      const { ssn } = req.params;
      const appointments = await appointmentsModel.getAppointmentsForDoctor(ssn);
      res.json(appointments);
    } catch (err) {
      console.error('Error fetching doctor appointments:', err);
      res.status(500).json({ error: 'Failed to fetch doctor appointments' });
    }
  };

// Get appointment by id
exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentsModel.getAppointmentById(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    console.error('Error fetching appointment:', err);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
      const { startTime, endTime, location, notes, patientSSN, doctorSSN } = req.body;
  
      if (!startTime || !endTime || !location || !patientSSN || !doctorSSN) {
        return res.status(400).json({ error: 'Missing required appointment or participant information' });
      }
  
      const appointmentId = await appointmentsModel.createAppointmentWithSchedule(
        startTime,
        endTime,
        location,
        notes,
        patientSSN,
        doctorSSN
      );
  
      res.status(201).json({ message: 'Appointment created and scheduled', appointmentId });
    } catch (err) {
      console.error('Error creating scheduled appointment:', err);
      res.status(500).json({ error: 'Failed to create scheduled appointment' });
    }
  };

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, location, notes } = req.body;
    const updated = await appointmentsModel.updateAppointment(id, startTime, endTime, location, notes);
    if (updated.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment updated successfully' });
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await appointmentsModel.deleteAppointment(id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};