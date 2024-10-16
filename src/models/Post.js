const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    media : {
        path : {
            type : String ,
            required : true
        },
        description : {
            type : String,
            required : true,
        },
        user : {
            ref : 'User',
            required : true,
        },
        hashtags : {
            type : [String],
        }
    }
})

const model = mongoose.model('Post',schema)