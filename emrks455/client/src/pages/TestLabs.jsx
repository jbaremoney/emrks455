import React, { useState } from 'react';
import { getLabById, createLab, assignLab } from '../api/labs'; // adjust path if needed

const TestLabs = () => {
  const [result, setResult] = useState('');
  const [labId, setLabId] = useState('');
  const [patientSSN, setPatientSSN] = useState('');
  const [medicalSSN, setMedicalSSN] = useState('');
  const [fetchedLab, setFetchedLab] = useState(null);

  const handleCreateLab = async () => {
    try {
      const response = await createLab(result);
      console.log('Lab created:', response.data);
      alert('Lab created successfully!');
    } catch (error) {
      console.error('Error creating lab:', error);
      alert('Error creating lab');
    }
  };

  const handleAssignLab = async () => {
    try {
      await assignLab(labId, patientSSN, medicalSSN);
      alert('Lab assigned to patient successfully!');
    } catch (error) {
      console.error('Error assigning lab:', error);
      alert('Error assigning lab');
    }
  };

  const handleGetLab = async () => {
    try {
      const response = await getLabById(labId);
      setFetchedLab(response.data);
    } catch (error) {
      console.error('Error fetching lab:', error);
      alert('Error fetching lab');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Labs</h1>

      <div className="border p-4 mb-8">
        <h2 className="text-xl mb-2">Create Lab Test</h2>
        <input
          type="text"
          placeholder="Result (e.g., Positive for Flu)"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <button onClick={handleCreateLab} className="bg-green-500 text-white px-4 py-2 rounded">
          Create Lab
        </button>
      </div>

      <div className="border p-4 mb-8">
        <h2 className="text-xl mb-2">Assign Lab to Patient</h2>
        <input
          type="text"
          placeholder="Lab ID"
          value={labId}
          onChange={(e) => setLabId(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
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
        <button onClick={handleAssignLab} className="bg-blue-500 text-white px-4 py-2 rounded">
          Assign Lab
        </button>
      </div>

      <div className="border p-4">
        <h2 className="text-xl mb-2">Fetch Lab Test by ID</h2>
        <input
          type="text"
          placeholder="Lab ID"
          value={labId}
          onChange={(e) => setLabId(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <button onClick={handleGetLab} className="bg-purple-500 text-white px-4 py-2 rounded mb-4">
          Get Lab
        </button>

        {fetchedLab && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Lab Test Details:</h3>
            <pre>{JSON.stringify(fetchedLab, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestLabs;
