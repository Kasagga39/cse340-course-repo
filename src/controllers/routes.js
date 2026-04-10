import express from 'express';

import { showHomePage } from './index.js';
import { 
  showOrganizationsPage, 
  showOrganizationDetailsPage, 
  showNewOrganizationForm, 
  processNewOrganizationForm, 
  organizationValidation,
  showEditOrganizationForm,
  processEditOrganizationForm 
} from './organizations.js';
import { 
  showProjectsPage, 
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation,
  showEditProjectForm,
  processEditProjectForm,
  processVolunteerAction,
  processRemoveVolunteerAction
} from './projects.js';
import { 
  showCategoriesPage, 
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation
} from './categories.js';
import { 
  showUserRegistrationForm, 
  processUserRegistrationForm, 
  showLoginForm, 
  processLoginForm, 
  processLogout, 
  showDashboard, 
  showUsersPage,
  requireLogin, 
  requireAdmin 
} from './users.js';
import { testErrorPage } from './errors.js';

const router = express.Router();

router.get('/', showHomePage);

// User Auth Routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireLogin, requireAdmin, showUsersPage);

// Project routes
router.get('/projects', showProjectsPage);
router.get('/new-project', requireLogin, requireAdmin, showNewProjectForm);
router.post('/new-project', requireLogin, requireAdmin, projectValidation, processNewProjectForm);
router.get('/edit-project/:id', requireLogin, requireAdmin, showEditProjectForm);
router.post('/edit-project/:id', requireLogin, requireAdmin, projectValidation, processEditProjectForm);
router.get('/project/:id', showProjectDetailsPage);
router.get('/project/:id/volunteer', requireLogin, processVolunteerAction);
router.get('/project/:id/remove-volunteer', requireLogin, processRemoveVolunteerAction);

// Organization routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/new-organization', requireLogin, requireAdmin, showNewOrganizationForm);
router.post('/new-organization', requireLogin, requireAdmin, organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', requireLogin, requireAdmin, showEditOrganizationForm);
router.post('/edit-organization/:id', requireLogin, requireAdmin, organizationValidation, processEditOrganizationForm);

// Category routes
router.get('/categories', showCategoriesPage);
router.get('/new-category', requireLogin, requireAdmin, showNewCategoryForm);
router.post('/new-category', requireLogin, requireAdmin, categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', requireLogin, requireAdmin, showEditCategoryForm);
router.post('/edit-category/:id', requireLogin, requireAdmin, categoryValidation, processEditCategoryForm);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/assign-categories/:projectId', requireLogin, requireAdmin, showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireLogin, requireAdmin, processAssignCategoriesForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;