const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');
const {foodAll} = require('./controllers/foodAllController');
const {foodID} = require('./controllers/foodIDController');
const {foodName} = require('./controllers/foodNameController');
const {profileInput} = require('./controllers/profileInputController');
const {profileUpdate} = require('./controllers/profileUpdateController');
const {trackerID} = require('./controllers/trackerIDController');
const {trackerAll} = require('./controllers/trackerAllController');
const {trackerAdd} = require('./controllers/trackerAddController');

//Login + Register
router.post('/register', [
    body('username',"The username must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);

router.post('/login',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

//food stuff
router.get('/get-all-food', foodAll);
router.get('/get-food/:id', foodID);
//router.get('/get-food/:name', foodName);

//profile + data profile
router.get('/getuser',getUser);
router.post('/insert-data', profileInput);
router.patch('/update-data/:id', profileUpdate);

module.exports = router;