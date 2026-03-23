-- Drop table if it exists (be careful with this in production!)
DROP TABLE IF EXISTS organizations CASCADE;

-- Create organization table with additional useful fields
CREATE TABLE organizations (
    organizations_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    contact_email VARCHAR(255) NOT NULL UNIQUE,
    logo_filename VARCHAR(255),
    website_url VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert the partner organizations
INSERT INTO organization (
    name, 
    description, 
    contact_email, 
    logo_filename,
    website_url,
    is_active
) VALUES 
    (
        'BrightFuture Builders', 
        'Building brighter futures through community development and construction projects. We work with local communities to create sustainable housing and infrastructure.',
        'info@brightfuture.org', 
        'brightfuture-logo.png',
        'https://www.brightfuture.org',
        true
    ),
    (
        'GreenHarvest Growers', 
        'Sustainable farming and agricultural education for communities. Teaching organic farming practices and providing fresh produce to local food banks.',
        'contact@greenharvest.org', 
        'greenharvest-logo.png',
        'https://www.greenharvest.org',
        true
    ),
    (
        'UnityServe Volunteers', 
        'Connecting volunteers with meaningful service opportunities across the country. We believe everyone has something valuable to contribute.',
        'hello@unityserve.org', 
        'unityserve-logo.png',
        'https://www.unityserve.org',
        true
    );

-- Create an index for faster searches
CREATE INDEX idx_organizations_name ON organizations(name);
CREATE INDEX idx_organizations_email ON organizations(contact_email);

-- Query to view the organizations
SELECT 
    organizations_id,
    name,
    contact_email,
    substr(description, 1, 50) || '...' as description_preview,
    is_active,
    created_at
FROM organizations
ORDER BY name;