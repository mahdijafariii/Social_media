const express = require('express');
const path = require("path");
const app = express();
const cors = require('cors');
const authRoutes = require("../../Social_media/src/modules/auth/auth.router")
const flash = require('express-flash');
const session = require('express-session');
app.use(express.urlencoded({extended : true , limit : "50mb"}));
app.use(express.json({limit : "50mb"}));

// Express Flash
app.use(session({
    secret : "Secret Key",
    resave : false,
    saveUninitialized : false
}))
app.use(flash());

// static folders
app.use(express.static(path.join(__dirname,"..","public")))
app.use('/css',express.static(path.join(__dirname,'public/css')));
app.use('/fonts',express.static(path.join(__dirname,'public/fonts')))
app.use('/js',express.static(path.join(__dirname,'public/js')));
app.use('/images',express.static(path.join(__dirname,'public/images')))
const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};
app.use(cors(corsOptions))
// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "views"))

// router
app.get("/",(req ,res)=>{
    return res.render("index")
})
app.use("/auth", authRoutes);


app.use((req,res)=>{
    console.log("this path is not found :" , req.path);
    return res.status(500).json({message : "404! Path Not Found"})
})

module.exports = app;