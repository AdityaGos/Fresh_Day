const express = require('express');
const app =express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv= require('dotenv');
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");
const multer =require("multer");

const path =require("path");
dotenv.config();
// ()=>{} is arrow function

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>{

    console.log("Connected to MongoDB")
});
// if use images path dont make any request instead go to this directory

app.use("/images", express.static(path.join(__dirname, "public/images")));
//middle ware 

app.use(express.json ());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload =multer({storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

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