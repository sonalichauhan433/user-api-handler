const Mongoose = require("mongoose");

const UserSchema = Mongoose.Schema({
    email: {
      type : String,
      required:true
    },
    password:{
      type: String,
      required:true
    },
    token: {
        type: String,
        required:true
    }
});

module.exports = Mongoose.model('user', UserSchema);