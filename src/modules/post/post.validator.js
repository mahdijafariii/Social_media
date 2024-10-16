const yup = require('yup');
const {createPost} = require("./post.controller");

exports.createPostValidator = yup.object({
    description : yup.string().max(2200,"Description can not be more than 2200 char")
})