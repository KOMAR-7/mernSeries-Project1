const express = require("express");
const router = express.Router();
// const {home,register} = require('../controllers/auth-controller')\
const authControllers = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');
// const signupSchema = require('../validator/auth-validator')
const validatorSchema = require('../validator/auth-validator')
const validate = require('../middleware/validate-middleware')


// route the person visiting which page
// router.get("/",(req,res)=>{
//     // 200 is for success
//     res.status(200).send("Hello Omar to the Mern Stack Journey. I am from router");
// });

// You can use this as well
// router.route('/').get((req,res)=>{
//     res
//     .status(200)
//     .send("Hello Omar I am from router as well!!")
// });

// Since you added home in your contorller and 'require' here now just pass home
// router.route('/').get(home);
router.route('/').get(authControllers.home)
router.route('/register').post(validate(validatorSchema.signupSchema), authControllers.register);
router.route('/login').post(validate(validatorSchema.loginSchema),authControllers.login);
router.route('/user').get(authMiddleware,authControllers.user);

// get => read
// post => send to database
// put or patch => update or inser new row
// delete => delete

// to use routes which make or includes this file
module.exports = router;