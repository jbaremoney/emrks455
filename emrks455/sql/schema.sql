CREATE DATABASE EMRKS;
USE EMRKS;

-- Medical Professional Table
CREATE TABLE MedicalProfessional (
    ssn CHAR(9) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255),
    address VARCHAR(255)
);

-- Patient Table
CREATE TABLE Patient (
    ssn CHAR(9) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    insurance VARCHAR(255)
);

-- Allergy Table (Many-to-One with Patient)
CREATE TABLE Allergy (
    patient_ssn CHAR(9) NOT NULL,
    allergen VARCHAR(255) NOT NULL,
    PRIMARY KEY (patient_ssn, allergen),
    FOREIGN KEY (patient_ssn) REFERENCES Patient(ssn) ON DELETE CASCADE
);

-- Appointment Table
CREATE TABLE Appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    location VARCHAR(255),
    notes TEXT
);

-- Schedule_Appointment (Join Table for Many-to-Many Appointments)
CREATE TABLE Schedule_Appointment (
    appointment_id INT NOT NULL,
    patient_ssn CHAR(9) NOT NULL,
    medical_ssn CHAR(9) NOT NULL,
    PRIMARY KEY (appointment_id, patient_ssn, medical_ssn),
    FOREIGN KEY (appointment_id) REFERENCES Appointment(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_ssn) REFERENCES Patient(ssn) ON DELETE CASCADE,
    FOREIGN KEY (medical_ssn) REFERENCES MedicalProfessional(ssn) ON DELETE CASCADE
);

-- Lab Test Table
CREATE TABLE LabTest (
    id INT AUTO_INCREMENT PRIMARY KEY,
    result VARCHAR(255) NOT NULL,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Give_Result (Mapping Table for Test Results)
CREATE TABLE Give_Result (
    test_id INT NOT NULL,
    patient_ssn CHAR(9) NOT NULL,
    medical_ssn CHAR(9) NOT NULL,
    PRIMARY KEY (test_id, patient_ssn, medical_ssn),
    FOREIGN KEY (test_id) REFERENCES LabTest(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_ssn) REFERENCES Patient(ssn) ON DELETE CASCADE,
    FOREIGN KEY (medical_ssn) REFERENCES MedicalProfessional(ssn) ON DELETE CASCADE
);

-- Prescriptions Table
CREATE TABLE Prescription (
    id INT AUTO_INCREMENT PRIMARY KEY,
    drug VARCHAR(255) NOT NULL,
    amount VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Order_Prescription (Mapping Table for Many-to-Many Prescriptions)
CREATE TABLE Order_Prescription (
    prescription_id INT NOT NULL,
    patient_ssn CHAR(9) NOT NULL,
    medical_ssn CHAR(9) NOT NULL,
    prescribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (prescription_id, patient_ssn, medical_ssn),
    FOREIGN KEY (prescription_id) REFERENCES Prescription(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_ssn) REFERENCES Patient(ssn) ON DELETE CASCADE,
    FOREIGN KEY (medical_ssn) REFERENCES MedicalProfessional(ssn) ON DELETE CASCADE
);

CREATE TABLE AdminNote (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_ssn CHAR(9) NOT NULL,
    medical_ssn CHAR(9) NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_ssn) REFERENCES Patient(ssn) ON DELETE CASCADE,
    FOREIGN KEY (medical_ssn) REFERENCES MedicalProfessional(ssn) ON DELETE CASCADE
);

--might not need this anymore, because of a view that would do it instead.
-- -- Medical History Table 
-- CREATE TABLE MedicalHistory (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     patient_ssn CHAR(9) NOT NULL,
--     record TEXT NOT NULL,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (patient_ssn) REFERENCES Patient(ssn) ON DELETE CASCADE
-- );

-- Claim Table (Billing Information)
CREATE TABLE Claim (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_ssn CHAR(9) NOT NULL,
    medical_ssn CHAR(9) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_ssn) REFERENCES Patient(ssn) ON DELETE CASCADE,
    FOREIGN KEY (medical_ssn) REFERENCES MedicalProfessional(ssn) ON DELETE CASCADE
);

CREATE VIEW PatientMedicalHistory AS
SELECT p.ssn AS patient_ssn, lt.id AS test_id, a.id AS appointment_id,
       pr.id AS prescription_id, an.id AS admin_note_id
FROM Patient p
LEFT JOIN Give_Result gr ON p.ssn = gr.patient_ssn
LEFT JOIN LabTest lt ON gr.test_id = lt.id
LEFT JOIN Schedule_Appointment sa ON p.ssn = sa.patient_ssn
LEFT JOIN Appointment a ON sa.appointment_id = a.id
LEFT JOIN Order_Prescription op ON p.ssn = op.patient_ssn
LEFT JOIN Prescription pr ON op.prescription_id = pr.id
LEFT JOIN AdminNote an ON p.ssn = an.patient_ssn;
