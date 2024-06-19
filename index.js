const express=require("express");
const app=express();
const path=require('path')
const routes=require('./routes/routes');
const db=require("./models")
const cookieParser=require("cookie-parser");


app.use(express.urlencoded({extended:false}));

//middleware
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(express.json());
app.use(routes);

db.sequelize.sync().then((req)=>{
app.listen(3000,()=>{
    console.log("server running on 3000");
})
})