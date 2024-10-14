const express = require('express');
const path = require('path');
const app = express();

// ejs
app.set("view engine", "ejs");
app.set("ejs", path.join(__dirname , "views"))


// router
app.get("/",(req ,res)=>{
    return res.render("index")
})

module.exports = app;