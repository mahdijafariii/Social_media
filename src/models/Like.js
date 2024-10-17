const {default : mongoose} = require('mongoose');

const schema = new mongoose.Schema({
    post :{
        type : mongoose.Types.ObjectId,
        ref : "Post",
        required : true,
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    }
},{timestamps : true})

const model = mongoose.model("Like",schema);

module.exports = model;