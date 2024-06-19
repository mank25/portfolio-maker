const express=require("express");
const bcrypt = require("bcryptjs"); 
const jwt =require("jsonwebtoken");
const app=express();

const {User,Section,HeroSection}=require("../../models");
const{createTokens,getusername}=require('../../middleware/JWT');


const cookieParser=require("cookie-parser");


//middleware
app.use(cookieParser())

//register  controller
const getregisterCtrl=async(req,res)=>{
    res.render("register");
}
const registerCtrl= async (req,res)=>{
    const {username,email,password}=await req.body;
    console.log(email);
    //hash password
    bcrypt.hash(password,10).then((passwordHased)=>{ 
    //register user
    User.create({
        username:username,
        email:email,
        password:passwordHased
    })
    .then(()=>{
        res.json("user registered")
    })
    .catch((err)=>{
        if(err){
            res.status(400).json({error:err});
        }
    });
})
}

//login controller
const getloginCtrl=async(req,res)=>{
    res.render("login");
}
const loginCtrl=async (req,res)=>{
    const {email,password}=req.body;

    try{
        //check if email exist 
        const userfound=await User.findOne({where:{email:email}})
        if(!userfound){
            return res.status(400).json({status:"failed",data:"Invalid Credentials"})
        }

        //verify password
        const passwordvalid=await bcrypt.compare(password,userfound.password)
        if(!passwordvalid){
            if(userfound){
                return res.status(400).json({error:"Invalid Credentials"})
            }
    
        }
        const accessToken=createTokens(userfound);
        res.cookie("access-token",accessToken,{
            maxAge:60*60*24*30*1000,
            httpOnly:true
        })
        res.json({
            status:'success',
            data:userfound
        });
    }
    catch(error){
        res.json(error)
    }
}

//dashboard
const getdashboardCtrl=async(req,res)=>{
    res.render("dashboard");
}

//sections 
    //herosection  
    const getHeroSection = async (req, res) => {
        const accessToken=req.cookies["access-token"]
        const validToken=jwt.verify(accessToken,"Kevlar.0225")
            if(validToken){
                const username = validToken.username;
                res.render("HeroSection",{username:username});
            }
};
    const postHeroSection = async (req,res) => {
    const {username,name,role,heroDescription,ProfileImageName,cvFileName}=await req.body;

    try {
        const result = await HeroSection.update(
          { name: name , role: role, HeroDescription: heroDescription, ProfileImageName: ProfileImageName, CvFileName : cvFileName},
          { where: { username: username } }
        )
      } catch (error) {
           res.json(error)
    }


    
}


//profile controller
const profileCtrl=async(req,res)=>{
    const userName =  ((req.url).split("/"))[2];
    const users = await Section.findAll({
        where:{
            username:userName
        }
    });
    const herosection = await HeroSection.findAll({
        where:{
            username:userName
        }
    });
    res.render("profile",{data:users,data1:herosection})
}


module.exports={
    registerCtrl,
    loginCtrl,
    profileCtrl,
    getregisterCtrl,
    getloginCtrl,
    getHeroSection,
    postHeroSection,
    getdashboardCtrl}
