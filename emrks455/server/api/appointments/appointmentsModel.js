const pool = require('../../config/db');

// Get appointments for a patient
exports.getAppointmentsForPatient = async (ssn) => {
    const [rows] = await pool.query(`
      SELECT a.* 
      FROM Appointment a
      JOIN Schedule_Appointment sa ON a.id = sa.appointment_id
      WHERE sa.patient_ssn = ?
    `, [ssn]);
    return rows;
  };
  
  // Get appointments for a doctor
  exports.getAppointmentsForDoctor = async (ssn) => {
    const [rows] = await pool.query(`
      SELECT a.* 
      FROM Appointment a
      JOIN Schedule_Appointment sa ON a.id = sa.appointment_id
      WHERE sa.medical_ssn = ?
    `, [ssn]);
    return rows;
  };

// Get appointment by id
exports.getAppointmentById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Appointment WHERE id = ?', [id]);
  return rows[0];
};

// Create a new appointment
exports.createAppointmentWithSchedule = async (startTime, endTime, location, notes, patientSSN, doctorSSN) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
  
      // Insert into Appointment table
      const [appointmentResult] = await conn.query(
        'INSERT INTO Appointment (start_time, end_time, location, notes) VALUES (?, ?, ?, ?)',
        [startTime, endTime, location, notes]
      );
  
      const appointmentId = appointmentResult.insertId;
  
      // Insert into Schedule_Appointment table
      await conn.query(
        'INSERT INTO Schedule_Appointment (appointment_id, patient_ssn, medical_ssn) VALUES (?, ?, ?)',
        [appointmentId, patientSSN, doctorSSN]
      );
  
      await conn.commit();
      return appointmentId;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  };

// Update appointment
exports.updateAppointment = async (id, startTime, endTime, location, notes) => {
  const [result] = await pool.query(
    'UPDATE Appointment SET start_time = ?, end_time = ?, location = ?, notes = ? WHERE id = ?',
    [startTime, endTime, location, notes, id]
  );
  return result;
};

// Delete an appointment
exports.deleteAppointment = async (id) => {
  const [result] = await pool.query('DELETE FROM Appointment WHERE id = ?', [id]);
  return result;
};
