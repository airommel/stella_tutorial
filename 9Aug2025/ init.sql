-- psql script to initialize the room booking database
-- This script creates the necessary tables and relationships for the room booking system
DROP DATABASE IF EXISTS room_booking;
CREATE DATABASE room_booking;
\c room_booking 
CREATE TABLE divisions(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    division_id INTEGER REFERENCES divisions (id),
    location VARCHAR(255) NOT NULL
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    is_admin BOOLEAN DEFAULT FALSE,
    division_id INT NOT NULL REFERENCES divisions (id),
    password_hash VARCHAR(255) NOT NULL
);
CREATE TABLE bookings (
    id SERIAL,
    room_id INT NOT NULL REFERENCES rooms (id),
    user_id INT NOT NULL REFERENCES users (id),
    start_time timestamp NOT NULL,
    end_time timestamp NOT NULL
);

-- INSERT sample data into divisons
INSERT INTO divisions (name, description) VALUES
('IT', 'Information Technology Division'),
('HR', 'Human Resources Division'),
('Finance', 'Finance Division'),
('Marketing', 'Marketing Division');

-- INSERT sample data into rooms
INSERT INTO rooms (name, capacity, division_id, location) VALUES
('Conference Room A', 20, 1, '1st Floor'),
('Meeting Room B', 10, 2, '2nd Floor'),
('Training Room C', 15, 3, '3rd Floor'),
('Board Room D', 30, 4, '4th Floor'),
('Project Room E', 8, 1, '1st Floor'),
('Workshop Room F', 25, 2, '2nd Floor'),
('Strategy Room G', 12, 3, '3rd Floor'),
('Innovation Room H', 18, 4, '4th Floor');   


-- INSERT sample data into users
INSERT INTO users (username, email, is_admin, division_id, password_hash) VALUES
('admin','admin@gmail.com', TRUE, 1, 'hashed_password_1'),
('user1','user1@gmail.com', TRUE, 2, 'hashed_password_2'),
('user2','user2@gmail.com', TRUE, 3, 'hashed_password_3'),
('user3','user3@gmail.com', FALSE, 4, 'hashed_password_4'),
('user4','user4@gmail.com', TRUE, 1, 'hashed_password_5'),
('user5','user5@gmail.com', TRUE, 2, 'hashed_password_6'),
('user6','user6@gmail.com', TRUE, 4, 'hashed_password_7');

-- INSERT sample data into bookings
INSERT INTO bookings (room_id, user_id, start_time, end_time) VALUES
(1, 1, '2023-10-01 09:00:00', '2023-10-01 11:00:00'),
(2, 2, '2023-10-01 12:00:00', '2023-10-01 13:00:00'),
(3, 3, '2023-10-01 14:00:00', '2023-10-01 16:00:00'),
(4, 4, '2023-10-01 10:00:00', '2023-10-01 12:00:00'),
(5, 5, '2023-10-01 08:00:00', '2023-10-01 09:30:00'),
(6, 6, '2023-10-01 13:30:00', '2023-10-01 15:00:00'),
(7, 7, '2023-10-01 16:30:00', '2023-10-01 18:00:00'),
(8, 1, '2023-10-02 09:00:00', '2023-10-02 11:00:00'),
(1, 2, '2023-10-02 12:00:00', '2023-10-02 13:00:00'),
(2, 3, '2023-10-02 14:00:00', '2023-10-02 16:00:00'),
(3, 4, '2023-10-02 10:00:00', '2023-10-02 12:00:00'),
(4, 5, '2023-10-02 08:00:00', '2023-10-02 09:30:00'),
(5, 6, '2023-10-02 13:30:00', '2023-10-02 15:00:00'),
(6, 7, '2023-10-02 16:30:00', '2023-10-02 18:00:00'),
(7, 1, '2023-10-03 09:00:00', '2023-10-03 11:00:00'),
(8, 2, '2023-10-03 12:00:00', '2023-10-03 13:00:00'),
(1, 3, '2023-10-03 14:00:00', '2023-10-03 16:00:00'),
(2, 4, '2023-10-03 10:00:00', '2023-10-03 12:00:00');