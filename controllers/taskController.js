const Response = require('../helpers/response');
const HelperFunctions = require('../helpers/functions');
const TaskModel = require('../models/tasks');
const Mongoose = require('mongoose');
const mongooseObjectId = Mongoose.Types.ObjectId;

exports.create = async (req, res) =>{
    let title = req.body.title;
    let user_id = req.user._id;
    let priority = req.body.priority || false;
    try{
        let task = new TaskModel({
            title: title,
            user_id: user_id,
            priority: priority,
        });
        let result = await task.save();
        let response = Response.success();
        response.msg = "Task successfully created."
        response.payload = { task_id: result._id};
        return res.status(200).json(response);
    }
    catch(err){
        console.log(err)
        let response = Response.error();
        response.msg = "Something went wrong, Try Again";
        response.error = [{ param:"title", location: "body", value: title, err: "Task Creation failed."}];
        return res.status(400).json(response);
    }
}
exports.read = async (req, res) =>
{
   try{
        let result = await TaskModel.find({ user_id: mongooseObjectId(req.params.user_id)}, { _id: 0, __v: 0, user_id: 0 });
        let response = Response.success();
        if(result.length)
        {
            response.msg = "Success";
        }
        else{
            response.msg = "No Tasks found";
        }
        response.payload = [{ data: result, size: result.length, user: {email: req.user.email, id: req.user._id} }];
        return res.status(200).json(response);
   }
   catch(err)
   {
       console.log(err)
       let response = Response.error();
       response.msg = "Something went wrong."
       return res.status(400).json(response);
   }
}

