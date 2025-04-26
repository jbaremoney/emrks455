import React, { useState } from 'react';
import {
  getAllPatients,
  getPatientBySSN,
  createPatient,
  updatePatient,
  deletePatient,
  getAllergiesByPatient,
  addAllergy,
  deleteAllergy,
  getAppointmentsForPatient,
  getClaimsByPatient,
  getMedicalHistoryBySSN,
  getLabsByPatientSSN,
  getNotesByPatientSSN,
  getPresctiptionsByPatient
} from '../api/patients'; // adjust path if needed

const TestPatients = () => {
  const [ssn, setSSN] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [insurance, setInsurance] = useState('');
  const [allergen, setAllergen] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [listData, setListData] = useState([]);

  const handleCreatePatient = async () => {
    try {
      await createPatient(ssn, name, address, insurance);
      alert('Patient created!');
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleUpdatePatient = async () => {
    try {
      await updatePatient(ssn, name, address, insurance);
      alert('Patient updated!');
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleDeletePatient = async () => {
    try {
      await deletePatient(ssn);
      alert('Patient deleted!');
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleGetAllPatients = async () => {
    try {
      const res = await getAllPatients();
      setListData(res.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleGetPatientBySSN = async () => {
    try {
      const res = await getPatientBySSN(ssn);
      setPatientData(res.data);
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };

  const handleGetAllergies = async () => {
    try {
      const res = await getAllergiesByPatient(ssn);
      setListData(res.data);
    } catch (error) {
      console.error('Error fetching allergies:', error);
    }
  };

  const handleAddAllergy = async () => {
    try {
      await addAllergy(ssn, { allergen });
      alert('Allergy added!');
    } catch (error) {
      console.error('Error adding allergy:', error);
    }
  };

  const handleDeleteAllergy = async () => {
    try {
      await deleteAllergy(ssn, allergen);
      alert('Allergy deleted!');
    } catch (error) {
      console.error('Error deleting allergy:', error);
    }
  };

  const handleGetAppointments = async () => {
    try {
      const res = await getAppointmentsForPatient(ssn);
      setListData(res.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleGetClaims = async () => {
    try {
      const res = await getClaimsByPatient(ssn);
      setListData(res.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const handleGetMedicalHistory = async () => {
    try {
      const res = await getMedicalHistoryBySSN(ssn);
      const { labs, appointments, prescriptions, notes } = res.data;
  
      // Combine all into one list, or choose what you want to show
      const combined = [
        ...labs.map(l => ({ type: 'Lab', ...l })),
        ...appointments.map(a => ({ type: 'Appointment', ...a })),
        ...prescriptions.map(p => ({ type: 'Prescription', ...p })),
        ...notes.map(n => ({ type: 'Note', ...n }))
      ];
  
      setListData(combined); // now listData is a nice array!
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };
  

  const handleGetLabs = async () => {
    try {
      const res = await getLabsByPatientSSN(ssn);
      setListData(res.data);
    } catch (error) {
      console.error('Error fetching labs:', error);
    }
  };

  const handleGetNotes = async () => {
    try {
      const res = await getNotesByPatientSSN(ssn);
      setListData(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleGetPrescriptions = async () => {
    try {
      const res = await getPresctiptionsByPatient(ssn);
      setListData(res.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Patients</h1>

      <div className="border p-4 mb-8">
        <h2 className="text-xl mb-2">Patient Info</h2>
        <input
          type="text"
          placeholder="SSN"
          value={ssn}
          onChange={(e) => setSSN(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <input
          type="text"
          placeholder="Insurance"
          value={insurance}
          onChange={(e) => setInsurance(e.target.value)}
          className="border p-2 mb-4 block w-full"
        />

        <div className="space-x-2 mb-4">
          <button onClick={handleCreatePatient} className="bg-green-500 text-white px-4 py-2 rounded">
            Create Patient
          </button>
          <button onClick={handleUpdatePatient} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update Patient
          </button>
          <button onClick={handleDeletePatient} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete Patient
          </button>
          <button onClick={handleGetAllPatients} className="bg-blue-500 text-white px-4 py-2 rounded">
            Get All Patients
          </button>
          <button onClick={handleGetPatientBySSN} className="bg-purple-500 text-white px-4 py-2 rounded">
            Get Patient by SSN
          </button>
        </div>

        <h2 className="text-xl mb-2">Patient Details</h2>
        {patientData && (
          <div className="border p-4 mb-4">
            <pre>{JSON.stringify(patientData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="border p-4">
        <h2 className="text-xl mb-2">Patient Extra Actions</h2>

        <input
          type="text"
          placeholder="Allergen"
          value={allergen}
          onChange={(e) => setAllergen(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />

        <div className="space-x-2 mb-4">
          <button onClick={handleAddAllergy} className="bg-green-500 text-white px-4 py-2 rounded">
            Add Allergy
          </button>
          <button onClick={handleDeleteAllergy} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete Allergy
          </button>
          <button onClick={handleGetAllergies} className="bg-blue-500 text-white px-4 py-2 rounded">
            View Allergies
          </button>
          <button onClick={handleGetAppointments} className="bg-blue-500 text-white px-4 py-2 rounded">
            View Appointments
          </button>
          <button onClick={handleGetClaims} className="bg-blue-500 text-white px-4 py-2 rounded">
            View Claims
          </button>
          <button onClick={handleGetMedicalHistory} className="bg-blue-500 text-white px-4 py-2 rounded">
            View Medical History
          </button>
          <button onClick={handleGetLabs} className="bg-blue-500 text-white px-4 py-2 rounded">
            View Labs
          </button>
          <button onClick={handleGetNotes} className="bg-blue-500 text-white px-4 py-2 rounded">
            View Notes
          </button>
          <button onClick={handleGetPrescriptions} className="bg-blue-500 text-white px-4 py-2 rounded">
            View Prescriptions
          </button>
        </div>

        {listData.length > 0 && (
        <div className="border p-4 overflow-x-auto">
          <h3 className="font-semibold mb-2">Data:</h3>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                {Object.keys(listData[0]).map((key) => (
                  <th key={key} className="border px-4 py-2 text-left bg-gray-100">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listData.map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, idx) => (
                    <td key={idx} className="border px-4 py-2">
                      {value !== null ? value.toString() : 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default TestPatients;
