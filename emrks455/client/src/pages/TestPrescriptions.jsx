import React, { useState } from 'react';
import {
  getPrescriptionById,
  createPrescription,
  assignPrescription
} from '../api/prescriptions'; // adjust the path if needed

const TestPrescriptions = () => {
  const [prescriptionId, setPrescriptionId] = useState('');
  const [drug, setDrug] = useState('');
  const [amount, setAmount] = useState('');
  const [patientSSN, setPatientSSN] = useState('');
  const [medicalSSN, setMedicalSSN] = useState('');
  const [fetchedPrescription, setFetchedPrescription] = useState(null);

  const handleCreatePrescription = async () => {
    try {
      await createPrescription(drug, amount);
      alert('Prescription created successfully!');
      setDrug('');
      setAmount('');
    } catch (error) {
      console.error('Error creating prescription:', error);
      alert('Failed to create prescription');
    }
  };

  const handleAssignPrescription = async () => {
    try {
      await assignPrescription(prescriptionId, patientSSN, medicalSSN);
      alert('Prescription assigned to patient successfully!');
    } catch (error) {
      console.error('Error assigning prescription:', error);
      alert('Failed to assign prescription');
    }
  };

  const handleGetPrescription = async () => {
    try {
      const response = await getPrescriptionById(prescriptionId);
      setFetchedPrescription(response.data);
    } catch (error) {
      console.error('Error fetching prescription:', error);
      alert('Failed to fetch prescription');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Prescriptions</h1>

      <div className="border p-4 mb-8">
        <h2 className="text-xl mb-2">Create Prescription</h2>
        <input
          type="text"
          placeholder="Drug Name"
          value={drug}
          onChange={(e) => setDrug(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mb-4 block w-full"
        />
        <button onClick={handleCreatePrescription} className="bg-green-500 text-white px-4 py-2 rounded">
          Create Prescription
        </button>
      </div>

      <div className="border p-4 mb-8">
        <h2 className="text-xl mb-2">Assign Prescription to Patient</h2>
        <input
          type="text"
          placeholder="Prescription ID"
          value={prescriptionId}
          onChange={(e) => setPrescriptionId(e.target.value)}
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
          className="border p-2 mb-4 block w-full"
        />
        <button onClick={handleAssignPrescription} className="bg-blue-500 text-white px-4 py-2 rounded">
          Assign Prescription
        </button>
      </div>

      <div className="border p-4">
        <h2 className="text-xl mb-2">Get Prescription by ID</h2>
        <input
          type="text"
          placeholder="Prescription ID"
          value={prescriptionId}
          onChange={(e) => setPrescriptionId(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <button onClick={handleGetPrescription} className="bg-purple-500 text-white px-4 py-2 rounded mb-4">
          Fetch Prescription
        </button>

        {fetchedPrescription && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Prescription Details:</h3>
            <pre>{JSON.stringify(fetchedPrescription, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPrescriptions;
