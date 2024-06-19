const multer  = require('multer');

const accessToken=req.cookies["access-token"]
        const validToken=jwt.verify(accessToken,"Kevlar.0225")
            if(validToken){
                const username = validToken.username;
                  
            }