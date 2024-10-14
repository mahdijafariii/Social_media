const app = require('./app');
const {default : mongoose} = require('mongoose')
const e = require("express");
require('dotenv').config()
function startServer (){
    app.listen(process.env.PORT,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Server is running on port 4002 !");
        }
    })
}

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Db is Connected!'));
}
function run(){
    startServer();
    connectToDb()
}

run();