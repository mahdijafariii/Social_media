const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    media : {
        path : {
            type : String ,
            required : true
        },
        filename : {
            type : String,
            required: true,
        },
        description : {
            type : String,
        },
        user : {
            ref : 'User',
            required : true,
        }
    }
})

const model = mongoose.model('Post',schema)