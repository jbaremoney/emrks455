import React, { useState } from 'react';
import { createNote } from '../api/notes'; // Adjust path if needed

const TestNotes = () => {
  const [patientSSN, setPatientSSN] = useState('');
  const [medicalSSN, setMedicalSSN] = useState('');
  const [note, setNote] = useState('');

  const handleCreateNote = async () => {
    try {
      await createNote(patientSSN, medicalSSN, note);
      alert('Note created successfully!');
      // Optionally clear inputs
      setPatientSSN('');
      setMedicalSSN('');
      setNote('');
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Notes</h1>

      <div className="border p-4">
        <h2 className="text-xl mb-2">Create New Note</h2>
        
        <input
          type="text"
          placeholder="Patient SSN"
          value={patientSSN}
          onChange={(e) => setPatientSSN(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <input
          type="text"
          placeholder="Medical Professional SSN"
          value={medicalSSN}
          onChange={(e) => setMedicalSSN(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 mb-4 block w-full"
          rows="5"
        />

        <button onClick={handleCreateNote} className="bg-green-500 text-white px-4 py-2 rounded">
          Create Note
        </button>
      </div>
    </div>
  );
};

export default TestNotes;
