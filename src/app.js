const express = require('express');
const path = require('path');
const app = express();

// static folders
app.use('/css',express.static(path.join(__dirname,'public/css')));
app.use('/fonts',express.static(path.join(__dirname,'public/fonts')))
app.use('/js',express.static(path.join(__dirname,'public/js')));
app.use('/images',express.static(path.join(__dirname,'public/images')))

// ejs
app.set("view engine", "ejs");
app.set("ejs", path.join(__dirname , "views"))


// router
app.get("/",(req ,res)=>{
    return res.render("index")
})

module.exports = app;