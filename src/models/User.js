const {default : mongoose} = require('mongoose');
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    biography : {
        type : String,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
    },
    password : {
        type : String,
        required : true,
    },
    profilePicture : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ["USER", "ADMIN"],
        default : "USER",
    },
    private : {
        type : Boolean,
        default: false
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
},{timestamps : true})

schema.pre('save',async function (next){
    try {
        this.password = await bcrypt.hash(this.password , 10);
        next();
    }
    catch (error) {
        next(error);
    }
})

const model = mongoose.model("User",schema);

module.exports = model;