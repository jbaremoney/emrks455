import React, { useState } from 'react';
import { getAppointmentById, createAppointment, updateAppointment, deleteAppointment } from '../api/appointments'; // adjust path if needed

const TestAppointments = () => {
  const [appointmentId, setAppointmentId] = useState('');
  const [appointmentData, setAppointmentData] = useState(null);

  const handleGet = async () => {
    try {
      const res = await getAppointmentById(appointmentId);
      setAppointmentData(res.data);
    } catch (err) {
      console.error('Error getting appointment:', err);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await createAppointment('2025-05-01 10:00:00', '2025-05-01 11:00:00', 'Room 101', 'Follow-up', '123456789', '987654321');
      alert('Created appointment ID: ' + res.data.appointmentId);
    } catch (err) {
      console.error('Error creating appointment:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateAppointment(appointmentId, '2025-05-01 12:00:00', '2025-05-01 13:00:00', 'Room 102', 'Updated notes');
      alert('Appointment updated!');
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(appointmentId);
      alert('Appointment deleted!');
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Test Appointments</h1>

      <input
        type="text"
        placeholder="Appointment ID"
        value={appointmentId}
        onChange={(e) => setAppointmentId(e.target.value)}
        className="border p-2 mb-4 block"
      />

      <div className="space-x-2 mb-4">
        <button onClick={handleGet} className="bg-blue-500 text-white px-4 py-2 rounded">Get Appointment</button>
        <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded">Create Appointment</button>
        <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 rounded">Update Appointment</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete Appointment</button>
      </div>

      {appointmentData && (
        <div className="border p-4">
          <h2 className="text-xl mb-2">Appointment Data:</h2>
          <pre>{JSON.stringify(appointmentData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestAppointments;
