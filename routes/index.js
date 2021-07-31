const express = require('express');
const indexRouter = express.Router();
const userRouter = require('./user');
const apiRouter = require('./api');
const Auth = require('../controllers/auth/authController');
indexRouter.all('/*',function(req, res, next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Method','GET,POST,PUT,OPTIONS');
	res.header('Access-Control-Allow-Headers','*');
	next();
})

indexRouter.use('/user', userRouter);
indexRouter.use('/api', Auth.validateUser, apiRouter);

indexRouter.get("/health-check", (req, res) => {
  return res.status(200).send("ok");
});
indexRouter.get('/', (req, res)=>{
	return res.send("Welcome to User Api Handler.")
})

module.exports = indexRouter;



