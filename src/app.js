const express = require('express');
const path = require("path");
const app = express();

app.use(express.urlencoded({extended : true , limit : "50mb"}));
app.use(express.json({limit : "50mb"}));

// static folders
app.use(express.static(path.join(__dirname,"..","public")))
app.use('/css',express.static(path.join(__dirname,'public/css')));
app.use('/fonts',express.static(path.join(__dirname,'public/fonts')))
app.use('/js',express.static(path.join(__dirname,'public/js')));
app.use('/images',express.static(path.join(__dirname,'public/images')))

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"))

// router
app.get("/",(req ,res)=>{
    return res.render("index")
})

app.use((req,res)=>{
    console.log("this path is not found :" , req.path);
})

module.exports = app;