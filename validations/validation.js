const Response = require('../helpers/response');
const { check, body, validationResult, param } = require('express-validator');
const Mongoose = require('mongoose');
const mongooseObjectId = Mongoose.Types.ObjectId;
exports.uservalidation = [
	check('email').isEmail().withMessage('Invalid email'),
	check('password').matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})").trim().escape().withMessage("Password must contain at least 1 uppercase, 1 lowercase, 1 numeric, 1 special character and eight characters"),
	(req, res,next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
            let response = Response.error();
            response.msg = "Invalid Request";
            response.error = errors.errors;
		    return res.status(422).json(response);
		}
		next();
	}
]

exports.taskValidation = [
    body('title').exists().not().withMessage('Title is required').trim().isEmpty().withMessage('Invalid title'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
            let response = Response.error();
            response.msg = "Invalid Request";
            response.error = errors.errors;
		    return res.status(422).json(response);
		}
		next();
	}
]

exports.useridValidation = [
    param('user_id').exists().custom(id => mongooseObjectId.isValid(id)).withMessage('Invalid user_id'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
            let response = Response.error();
            response.msg = "Invalid Request";
            response.error = errors.errors;
		    return res.status(422).json(response);
		}
		next();
	}
  ]