const express=require("express");
const cookieParser=require("cookie-parser");
const jwt = require("jsonwebtoken")


const app=express();
app.use(cookieParser())


const createTokens=(user)=>{
    const accessToken=jwt.sign({
        username:user.username
    },"Kevlar.0225");

    return accessToken;
}

const validateToken=(req,res,next)=>{
    const accessToken=req.cookies["access-token"]
    if(!accessToken){
        return res.status(400).json({error:"user not authenticated!"})
    }
    try{
        const validToken=jwt.verify(accessToken,"Kevlar.0225")
        if(validToken){
            req.authenticated=true
            req.user = validToken
            return next();
        }
    }catch(err){
        return res.status(400).json({error:err})
    }
}


module.exports={createTokens,validateToken};