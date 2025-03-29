CREATE DATABASE IF NOT EXISTS dummy_db;
USE dummy_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  appointment_date DATETIME NOT NULL,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample users
INSERT INTO users (name, email)
VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Carol Davis', 'carol@example.com');

-- Insert sample appointments
INSERT INTO appointments (user_id, appointment_date, reason)
VALUES
(1, '2025-04-01 10:00:00', 'Check-up'),
(2, '2025-04-02 13:30:00', 'Follow-up'),
(1, '2025-04-05 09:15:00', 'Lab results review');
