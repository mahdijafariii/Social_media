const {default : mongoose} = require('mongoose');

const schema = new mongoose.Schema({
    follower :{
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    },
    following : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    }
},{timestamps : true})

const model = mongoose.model("Follow",schema);

module.exports = model;