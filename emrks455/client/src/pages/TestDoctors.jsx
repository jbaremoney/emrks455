import React, { useState } from 'react';
import {
  getAllDoctors,
  getDoctorsBySSN,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAppointmentsForDoctor // ⬅️ new import
} from '../api/medicalProffesional'; // adjust path if needed

const TestDoctors = () => {
  const [ssn, setSSN] = useState('');
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');
  const [doctorsList, setDoctorsList] = useState([]);
  const [singleDoctor, setSingleDoctor] = useState(null);
  const [appointmentsList, setAppointmentsList] = useState([]);

  const handleCreateDoctor = async () => {
    try {
      await createDoctor(ssn, name, specialty, address);
      alert('Doctor created successfully!');
    } catch (error) {
      console.error('Error creating doctor:', error);
      alert('Failed to create doctor');
    }
  };

  const handleUpdateDoctor = async () => {
    try {
      await updateDoctor(ssn, name, specialty, address);
      alert('Doctor updated successfully!');
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('Failed to update doctor');
    }
  };

  const handleDeleteDoctor = async () => {
    try {
      await deleteDoctor(ssn);
      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('Failed to delete doctor');
    }
  };

  const handleGetAllDoctors = async () => {
    try {
      const res = await getAllDoctors();
      setDoctorsList(res.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      alert('Failed to fetch doctors');
    }
  };

  const handleGetDoctorBySSN = async () => {
    try {
      const res = await getDoctorsBySSN(ssn);
      setSingleDoctor(res.data);
    } catch (error) {
      console.error('Error fetching doctor:', error);
      alert('Failed to fetch doctor');
    }
  };

  const handleGetAppointmentsForDoctor = async () => {
    try {
      const res = await getAppointmentsForDoctor(ssn);
      setAppointmentsList(res.data);
    } catch (error) {
      console.error('Error fetching appointments for doctor:', error);
      alert('Failed to fetch appointments');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Doctors</h1>

      <div className="border p-4 mb-8">
        <h2 className="text-xl mb-2">Doctor Info</h2>
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
          placeholder="Specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="border p-2 mb-2 block w-full"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 mb-4 block w-full"
        />

        <div className="space-x-2">
          <button onClick={handleCreateDoctor} className="bg-green-500 text-white px-4 py-2 rounded">
            Create Doctor
          </button>
          <button onClick={handleUpdateDoctor} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update Doctor
          </button>
          <button onClick={handleDeleteDoctor} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete Doctor
          </button>
        </div>
      </div>

      <div className="border p-4 mb-8">
        <h2 className="text-xl mb-2">Fetch Doctors / Appointments</h2>
        <div className="space-x-2 mb-4">
          <button onClick={handleGetAllDoctors} className="bg-blue-500 text-white px-4 py-2 rounded">
            Get All Doctors
          </button>
          <button onClick={handleGetDoctorBySSN} className="bg-purple-500 text-white px-4 py-2 rounded">
            Get Doctor by SSN
          </button>
          <button onClick={handleGetAppointmentsForDoctor} className="bg-indigo-500 text-white px-4 py-2 rounded">
            Get Doctor's Appointments
          </button>
        </div>

        {singleDoctor && (
          <div className="border p-2 mb-4">
            <h3 className="font-semibold mb-2">Doctor Details:</h3>
            <pre>{JSON.stringify(singleDoctor, null, 2)}</pre>
          </div>
        )}

        {appointmentsList.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Appointments for Doctor:</h3>
            <ul>
              {appointmentsList.map((appt) => (
                <li key={appt.id} className="border p-2 mb-2">
                  {appt.start_time} - {appt.end_time} @ {appt.location} ({appt.notes})
                </li>
              ))}
            </ul>
          </div>
        )}

        {doctorsList.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">All Doctors:</h3>
            <ul>
              {doctorsList.map((doc) => (
                <li key={doc.ssn} className="border p-2 mb-2">
                  {doc.name} - {doc.specialty} - {doc.address}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDoctors;
