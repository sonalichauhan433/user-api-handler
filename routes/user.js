const express = require('express');
const userRouter = express.Router();
const Response = require('../helpers/response');
const userController = require('../controllers/userController');
const Validator = require('../validations/validation');
const Auth = require('../controllers/auth/authController');

userRouter.all('/*',function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Method','GET,POST,PUT,OPTIONS');
	res.header('Access-Control-Allow-Headers','*');
	next();
})

userRouter.post('/register', Validator.uservalidation, userController.create);
userRouter.delete('/:user_id/remove', Validator.useridValidation, userController.remove);
userRouter.get('/readall', Auth.validateUser, userController.readAll);

userRouter.all("/", (req, res)=>{
  let response = Response.success();
  return res.status(200).json(response);
});

module.exports = userRouter;



