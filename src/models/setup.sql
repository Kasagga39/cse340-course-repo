-- database: :memory:
-- =====================================================
-- DATABASE SETUP SCRIPT
-- =====================================================

-- =====================================================
-- DROP EXISTING TABLES (Clean start)
-- =====================================================
-- Use CASCADE to ensure all dependent objects are also dropped
DROP TABLE IF EXISTS project_volunteers CASCADE;
DROP TABLE IF EXISTS user_project_volunteers CASCADE;
DROP TABLE IF EXISTS project_categories CASCADE;
DROP TABLE IF EXISTS service_project CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS organization CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- =====================================================
-- CREATE ROLES TABLE
-- =====================================================
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert default roles
INSERT INTO roles (role_name) VALUES ('admin'), ('user');

-- =====================================================
-- CREATE USERS TABLE
-- =====================================================
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

-- =====================================================
-- CREATE ORGANIZATION TABLE
-- =====================================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CREATE CATEGORY TABLE
-- =====================================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon_filename VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CREATE SERVICE PROJECT TABLE
-- =====================================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organization (organization_id) ON DELETE CASCADE
);

-- Create index for faster queries
CREATE INDEX idx_project_organization ON service_project (organization_id);
CREATE INDEX idx_project_date ON service_project (project_date);

-- =====================================================
-- CREATE PROJECT_CATEGORIES TABLE (Junction table)
-- =====================================================
CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES service_project (project_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category (category_id) ON DELETE CASCADE
);

-- =====================================================
-- CREATE PROJECT_VOLUNTEERS TABLE (Junction table)
-- =====================================================
CREATE TABLE project_volunteers (
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES service_project (project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================
INSERT INTO category (name, description, icon_filename) VALUES 
('Education', 'Projects focused on teaching, mentoring, and educational support for all ages.', 'education-icon.png'),
('Environment', 'Conservation, cleanup, and sustainability initiatives to protect our planet.', 'environment-icon.png'),
('Health & Wellness', 'Healthcare services, mental health support, and wellness programs.', 'health-icon.png'),
('Community Development', 'Infrastructure, housing, and community improvement projects.', 'community-icon.png'),
('Food Security', 'Food banks, meal programs, and agricultural initiatives to fight hunger.', 'food-icon.png');

INSERT INTO organization (name, description, contact_email, logo_filename) VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

INSERT INTO service_project (organization_id, title, description, location, project_date) VALUES 
(1, 'Community Center Renovation', 'Renovating the downtown community center including painting, roof repair, and new flooring.', '123 Main St, Downtown', '2024-06-15'),
(1, 'Park Cleanup Initiative', 'Cleaning and beautifying Riverside Park with new benches and trash cans.', 'Riverside Park', '2024-07-22'),
(2, 'Urban Farm Workshop', 'Teaching community members how to start container gardens.', '789 Elm St, Community Center', '2024-06-10'),
(3, 'Food Bank Sorting', 'Sorting and organizing donations at the regional food bank.', '321 Cedar Rd, Food Bank', '2024-06-20');

INSERT INTO project_categories (project_id, category_id) VALUES
(1, 1), (1, 4), (2, 2), (3, 1), (3, 2), (4, 5);
