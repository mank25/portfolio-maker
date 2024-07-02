const multer = require("multer");
const path = require("node:path");
const jwt = require("jsonwebtoken")
 
const storageConfig = multer.diskStorage({
    destination: function (req,file,cb){
        if(file.mimetype==="image/jpeg"){
            cb(null,'public/uploads/profileimage');
        }
        else if(file.mimetype==='application/pdf'){
            cb(null,'public/uploads/cv');
        }
    },
    filename: (req, file, res) => {
        const accessToken=req.cookies["access-token"]
        const validToken=jwt.verify(accessToken,"Kevlar.0225")
            if(validToken){
                const username = validToken.username;
                res(null,username+path.extname(file.originalname));
            }
            
    },
});

const cvstorage = multer.diskStorage({
    // destinations is uploads folder 
    // under the project directory
  destination: path.join(__dirname, "../uploads/cv"),
  filename: (req, file, res) => {
      const accessToken=req.cookies["access-token"]
      const validToken=jwt.verify(accessToken,"Kevlar.0225")
          if(validToken){
              const username = validToken.username;
              res(null,username+".pdf");
          }          
  },
});

// const profileupload = multer({
//     storage: storageConfig,
// });
 
const uploadImg=multer({storage:storageConfig}).fields([{name:'ProfileImageName'},{name:'cvFileName'}])

module.exports = {
    uploadImg
};