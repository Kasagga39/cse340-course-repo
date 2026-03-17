CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    description TEXT,
    contact_email VARCHAR(255),
    logo_filename VARCHAR(255)
);

INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
('BrightFuture Builders', 'A partner organization', 'info@brightfuture.org', '/images/brightfuture-logo.png'),
('GreenHarvest Growers', 'A partner organization', 'contact@greenharvest.org', '/images/greenharvest-logo.png'),
('UnityServe Volunteers', 'A partner organization', 'hello@unityserve.org', '/images/unityserve-logo.png');