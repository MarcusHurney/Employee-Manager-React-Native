
const passport = require('passport');

const AuthenticationController = require('../controllers/authentication_controller');
const EmployeeController = require('../controllers/employee_controller');
const passportService = require('./passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});
var router = require('express').Router();

function protected (req, res, next) {
  res.send("Here's the secret");
};

// Auth Routes
// -----------------------------------------------------------------------------
router.route('/protected')
  .get(requireAuth, protected);
router.route('/signup')
  .post(AuthenticationController.signup);
router.route('/signin')
  .post([requireLogin, AuthenticationController.signin]);


// Employee Routes
// -----------------------------------------------------------------------------
router.route('/employee/create')
  .post(EmployeeController.createEmployee);

router.route('/employee/fetchAll')
  .get(EmployeeController.fetchAll);

router.route('/employee/edit')
  .patch(EmployeeController.editEmployee);

router.route('/employee/delete/:id')
  .delete(EmployeeController.deleteEmployee);

module.exports = router;
