const Mongoose = require("mongoose");
const mongooseObjectId = Mongoose.Types.ObjectId;

const TaskSchema = Mongoose.Schema({
    user_id: {
      type : mongooseObjectId,
      required:true
    },
    title: {
      type: String,
      required:true
    },
    priority: {
        type: Boolean,
        default: false
    }
});

module.exports = Mongoose.model('task', TaskSchema);