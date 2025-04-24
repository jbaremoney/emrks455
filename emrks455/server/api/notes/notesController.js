const notesModel = require('./notesModel');

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { patientSSN, medicalSSN, note } = req.body;
    const id = await notesModel.createNote(patientSSN, medicalSSN, note);
    res.status(201).json({ message: 'Note created', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

// Get notes for a patient
exports.getNotesByPatientSSN = async (req, res) => {
  try {
    const { ssn } = req.params;
    const notes = await notesModel.getNotesByPatientSSN(ssn);
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve notes' });
  }
};
