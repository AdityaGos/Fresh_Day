const express = require('express');
const app =express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv= require('dotenv');
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");
dotenv.config();
// ()=>{} is arrow function
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{

    console.log("Connected to MongoDB")
});

//middle ware 

app.use(express.json ());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);


// app.listen(8000,()=>{
//     console.log("Backend server is running ")
// });

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});


app.get("/",(req,res)=>{

    res.send("Welcome to homepage")

})

app.get("/jai",(req,res)=>{

    res.send("You are in Shree Ram place `\n` And everthing will be fine ")
})