const express=require("express");
const { registerCtrl, loginCtrl, profileCtrl, getregisterCtrl, getloginCtrl, getHeroSection,postHeroSection, getdashboardCtrl } = require("../controller/user/user");
const { validateToken} = require("../middleware/JWT");
const cookieParser=require("cookie-parser");
const {uploadImg} = require("../middleware/multer");


const Router=express.Router()
Router.use(cookieParser())
//index
// Router.post("/",);

//register
Router.get("/register",getregisterCtrl);
Router.post("/register",registerCtrl);


//login
Router.get("/login",getloginCtrl);
Router.post("/login",loginCtrl);

//dashboard
Router.get("/dashboard",validateToken,getdashboardCtrl);

//edit hero section
Router.get("/herosection",validateToken,getHeroSection);
Router.post("/herosection",validateToken,uploadImg,postHeroSection);
//profile
Router.get("/profile/:id",profileCtrl);

// Router.post("/edit-profile",);
module.exports=Router