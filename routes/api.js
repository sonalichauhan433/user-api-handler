const express = require('express');
const apiRouter = express.Router();
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const Validator = require('../validations/validation');

apiRouter.get('/:user_id/tasks', Validator.useridValidation, userController.readOneById, taskController.read);
apiRouter.post('/task/create', Validator.taskValidation, taskController.create);


module.exports = apiRouter;



