import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllUsers } from '../models/users.js';

/**
 * Controller to show the registration form.
 */
const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

/**
 * Controller to process the registration form.
 */
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Flash success and redirect to login
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

/**
 * Controller to show the login form.
 */
const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

/**
 * Controller to process the login form.
 */
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        
        if (user) {
            // Save user to session
            req.session.user = user;
            
            if (process.env.ENABLE_SQL_LOGGING === 'true') {
                console.log('User logged in:', user);
            }

            req.flash('success', 'Login successful!');
            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid email or password. Please try again.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

/**
 * Controller to handle user logout.
 */
const processLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/login');
    });
};

/**
 * Controller to show the dashboard.
 */
const showDashboard = (req, res) => {
    const { name, email, role_name } = req.session.user;
    res.render('dashboard', { 
        title: 'Dashboard', 
        name, 
        email, 
        role: role_name 
    });
};

/**
 * Controller to show all registered users (Admin only).
 */
const showUsersPage = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.render('users', { 
            title: 'Registered Users', 
            users 
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        req.flash('error', 'Failed to load users list.');
        res.redirect('/dashboard');
    }
};

/**
 * Middleware to require login for protected routes.
 */
const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    req.flash('error', 'You must be logged in to access this page.');
    res.redirect('/login');
};

/**
 * Middleware to require admin role for specific routes.
 */
const requireAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role_name === 'admin') {
        return next();
    }
    req.flash('error', 'Unauthorized access. Admins only.');
    res.redirect('/dashboard');
};

export { 
    showUserRegistrationForm, 
    processUserRegistrationForm, 
    showLoginForm, 
    processLoginForm, 
    processLogout, 
    showDashboard, 
    showUsersPage,
    requireLogin, 
    requireAdmin 
};
