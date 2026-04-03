import db from './db.js';
import bcrypt from 'bcrypt';

/**
 * Creates a new user in the database with the 'user' role by default.
 */
const createUser = async (name, email, passwordHash) => {
    // Check if any users exist. If not, the first user becomes an admin.
    const countQuery = 'SELECT COUNT(*) FROM users';
    const countResult = await db.query(countQuery);
    const userCount = parseInt(countResult.rows[0].count);
    
    const role = userCount === 0 ? 'admin' : 'user';
    
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const query_params = [name, email, passwordHash, role];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

/**
 * Finds a user by their email address.
 */
const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, u.role_id, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const query_params = [email];
    
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

/**
 * Verifies a plain text password against a hashed password.
 */
const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

/**
 * Authenticates a user by email and password.
 * Returns the user object (without password_hash) if successful, null otherwise.
 */
const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        return null;
    }

    const isMatch = await verifyPassword(password, user.password_hash);
    if (isMatch) {
        // Remove password hash before returning user object
        const { password_hash, ...userWithoutHash } = user;
        return userWithoutHash;
    }

    return null;
};

/**
 * Retrieves all registered users from the database.
 */
const getAllUsers = async () => {
    const query = `
        SELECT u.user_id, u.name, u.email, r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        ORDER BY u.name ASC
    `;
    const result = await db.query(query);
    return result.rows;
};

export { createUser, authenticateUser, getAllUsers };
