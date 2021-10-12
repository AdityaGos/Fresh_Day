const router = require('express').Router();
const User=require("../models/User");
const bcrypt = require('bcrypt');

//REGISTER
router.post("/register",async (req,res)=>{
  

  // when writing async funtion write try and catch if any error occur 
  try{

    //generate hashed password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);

    //creating User
    const newUser= new User({
      username:req.body.username,
      email:req.body.email,
      password:hashedPassword,
      desc:req.body.desc,
      from:req.body.from,
      city:req.body.city,
      relationship:req.body.relationship,
      
    });

    //Save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  }
  catch(err){ console.log(err)}
  
});


//LOGIN USER
router.post("/login",async (req,res)=>{

  try
  {
    const user= await User.findOne({email:req.body.email});
    // if user doesn't exist return 
    !user && res.status(404).json("user not found")
    
    const validPassword= await bcrypt.compare(req.body.password, user.password);
  

    !validPassword && res.status(400).json(`you have entered wrong password${req.body.password}`)
  
    res.status(200).json(user);
  
  }
 catch(err){ res.status(400).json(err) }



});

module.exports=router