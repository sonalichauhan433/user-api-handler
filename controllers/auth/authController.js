const UserController = require('../userController');
const Response = require('../../helpers/response');

exports.validateUser = async (req, res, next) => {
    try{
        if(!req.headers['x-access-token'])
        {
            let response = Response.error();
            response.msg = "Invalid request";
            response.error = [{param: "x-access-token", location : "headers", msg: "Invalid x-access-token"}];
            return res.status(403).json(response);
        }
        let token = req.headers['x-access-token'].trim();
        let user = await UserController.getUser({token: token});
        if(!user)
        {
            let response = Response.error();
            response.msg = "Access Denied";
            response.error = [{param: "x-access-token", location : "headers", msg: "Invalid x-access-token, Token doesn't exists"}];
            return res.status(401).json(response);
        }
        req.user = user;
        next();
    }
    catch(err)
    {
        let response = Response.error();
        response.msg = "Something went wrong, Internal Error";
        response.error = [{param: "x-access-token", location : "headers", msg: "Invalid request"}];
        return res.status(403).json(response);
    }
} 