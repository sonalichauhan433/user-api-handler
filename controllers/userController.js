const Response = require('../helpers/response');
const HelperFunctions = require('../helpers/functions');
const UserModel = require('../models/user');
const Mongoose = require('mongoose');
const mongooseObjectId = Mongoose.Types.ObjectId;

exports.create = async (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    try{
        let isExisting = await UserModel.findOne({email: email });
        if(isExisting)
        {
            let response = Response.error();
            response.msg = "Email already exists";
            response.error = [{ param:"email", location: "body", value: email, err: "User exists"}];
            return res.status(400).json(response);
        }
        let user = new UserModel({
            email: email,
            password: password,
            token: HelperFunctions.generateToken(25)
        });
        let result = await user.save();
        let response = Response.success();
        response.msg = "User successfully registered."
        response.payload = { email: email, token: result.token, id: result._id };
        return res.status(200).json(response);
    }
    catch(err){
        console.log(err)
        let response = Response.error();
        response.msg = "Something went wrong, Try Again";
        response.error = [{ param:"email", location: "body", value: email, err: err.message}];
        return res.status(400).json(response);
    }
}

exports.remove = async (req, res) =>{
    let user_id = req.params.user_id;
    try{
        let result = await UserModel.deleteOne({_id: mongooseObjectId(user_id)});
        if(result.deletedCount === 1)
        {
            let response = Response.success();
            response.msg = "User Successfully deleted."
            response.payload = { user_id: user_id };
            return res.status(200).json(response);
        }
        let response = Response.error();
        response.msg = "User doesn't Exists.";
        response.error = [{user_id: user_id, msg: "email not found"}];
        return res.status(400).json(response);
    }
    catch(err)
    {
        console.log(err);
        let response = Response.error();
        response.msg = "Something went wrong, Try Again";
        response.error = [{email: email, msg: "User deletion failed."}];
        return res.status(400).json(response);
    }
    
}

exports.readAll = async (req, res) =>
{
   try{
        let options = {limit: 100, skip: 0, sort: {_id: -1}}; 
        options.limit = (req.query.limit && !isNaN(req.query.limit))? +(req.query.limit): options.limit; 
        let page = (req.query.page && !isNaN(req.query.page))? (+req.query.page) : 1;
        options.skip = (page - 1) * options.limit; 
        options.sort['_id'] = (req.query.sort === 'asc')? 1: -1 ;
        let result = await UserModel.find({}, { password: 0, token: 0, __v: 0}, options);
        let response = Response.success();
        if(result.length)
        {
            response.msg = "Success";
        }
        else{
            response.msg = "No record found";
        }
        response.payload = [{ data: result, size: result.length, limit: options.limit, page: page}];
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

exports.readOneById = async (req, res, next) =>{
    try{
        let result = await UserModel.findOne({ _id: mongooseObjectId(req.params.user_id)}, { _id: 0});
        if(!result)
        {
            let response = Response.error();
            response.msg = "Invalid Request";
            response.error = [{param: "user_id", location: "params", value:  req.params.user_id, msg: "User id doesn't exists."}];
            return res.status(400).json(response);
        }
        req.user = result;
        next();
   }
   catch(err)
   {
       console.log(err)
       let response = Response.error();
       response.msg = "Something went wrong."
       return res.status(400).json(response);
   }
}

exports.getUser = async (filter) =>{
    try{
        let result = await UserModel.findOne(filter);
        return result;
    }
    catch(err)
    {
        console.log(err);
    }
    return null;
}