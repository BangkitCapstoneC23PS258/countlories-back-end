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
const {favID} = require('./controllers/favoriteGetController');
const {favFoodID} = require('./controllers/favoriteGetIDController');
const {favDelete} = require('./controllers/favoriteDeleteController');
const {favAdd} = require('./controllers/favoriteAddController');

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
],login);.0

//Food
router.get('/getfood', foodAll);
router.get('/getfoodid/:id', foodID);
router.get('/getfoodname/:name', foodName);

//Profile + data profile
router.get('/getuser',getUser);
router.post('/postuser', profileInput);
router.patch('/patchuser/:user_id', profileUpdate);

//Tracker
router.post('/posttracker',trackerAdd);
router.get('/gettracker/:id',trackerAll);
router.get('/gettrackerid/:id',trackerID);

//Favorite
router.get('/getfav/:id',favID);
router.get('/getfavid/:user_id/:food_id',favFoodID);
router.post('/postfav',favAdd);
router.delete('/deletefav/:user_id/:food_id',favDelete);

router.get('/', (req, res) => {
  res.send('Welcome to Countlorie Back End')
});

module.exports = router;