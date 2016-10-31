
const passport = require('passport');

const AuthenticationController = require('../controllers/authentication_controller');
// const TodosController = require('../controllers/todos_controller');
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


// Todo Routes
// -----------------------------------------------------------------------------
// router.route('/users/:user_id/todos')
//   .post(requireAuth, TodosController.create)
//   .get(requireAuth, TodosController.index);
//
// router.route('/users/:user_id/todos/:todo_id')
//   .delete(requireAuth, TodosController.destroy);

module.exports = router;
