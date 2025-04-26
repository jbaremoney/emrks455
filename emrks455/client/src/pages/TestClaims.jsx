import React, { useState } from 'react';
import { createClaim, updateClaimStatus } from '../api/claims'; // adjust path if needed

const ClaimsPage = () => {
  const [patientSSN, setPatientSSN] = useState('');
  const [medicalSSN, setMedicalSSN] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Pending');

  const [claimId, setClaimId] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const handleCreateClaim = async () => {
    try {
      const res = await createClaim(patientSSN, medicalSSN, amount, status);
      console.log('Claim created:', res.data);
      alert('Claim created successfully!');
    } catch (error) {
      console.error('Error creating claim:', error);
      alert('Error creating claim');
    }
  };

  const handleUpdateClaim = async () => {
    try {
      const res = await updateClaimStatus(claimId, newStatus);
      console.log('Claim updated:', res.data);
      alert('Claim status updated successfully!');
    } catch (error) {
      console.error('Error updating claim:', error);
      alert('Error updating claim');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Claims Management</h1>

      <div className="border p-4 mb-8">
        <h2 className="text-xl mb-2">Create Claim</h2>
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
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mb-4 block w-full"
        >
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <button onClick={handleCreateClaim} className="bg-green-500 text-white px-4 py-2 rounded">
          Create Claim
        </button>
      </div>

      <div className="border p-4">
        <h2 className="text-xl mb-2">Update Claim Status</h2>
        <input
          type="text"
          placeholder="Claim ID"
          value={claimId}
          onChange={(e) => setClaimId(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="border p-2 mb-2 block w-full"
        >
          <option value="">Select new status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button onClick={handleUpdateClaim} className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Claim
        </button>
      </div>
    </div>
  );
};

export default ClaimsPage;
