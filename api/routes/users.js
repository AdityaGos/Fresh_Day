const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
//taking userId as parameter
router.put("/:id", async (req, res) => {
  //checking if the user updating the id belong to himself
    console.log("userid",req.body.userId);
    console.log("paramter",req.params.id);
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    //for changing the password we take password and hash it and assign to user password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);

        // userpassword = bcrypt (hash,userpassword)

        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      // Find the userid in the database and update the passed paramter
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});
//delete user

router.delete("/:id", async (req, res) => {
  //checking if the user updating the id belong to himself

  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      // Find the userid in the database and delete the passed paramter id
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json("Account has been deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can delete only your account");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId=req.query.userId;
  const username=req.query.username;
  
  try {
    const user = userId
    ?await User.findById(userId)
    : await User.findOne({username:username});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(400).json(err);
  }
});

//follow user

//put is used for updating something
//we are gonna update follow array

// if X want to follow Y
// userId(X) is the person who want to follow Y
//      then parameter id  contain Y
// follow (:/vikrant){ }
// while sending the follow resquest we send person Y id as parameter
// parameter (id ) contain the id of that person which will be followed by userId
//
router.put("/:id/follow", async (req, res) => {
//  check if the X id != Y id
  if (req.body.userId !== req.params.id) {
    try {
      // Y details                        id of Y
      const user = await User.findById(req.params.id);

      // X Details
      const currentUser = await User.findById(req.body.userId);
      console.log("Not following1");

      // if Y ka follower list[] me X nahe hai then do this
      if (!user.followers.includes(req.body.userId)) {

       //updating follower update of Y and adding X in the follow list
        //Adding X details in Y Follower list
        await user.updateOne({ $push: { followers: req.body.userId } });
        
        //Adding Y to following list of X
        // X[ A,B] after adding X [Y,A,B]
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        
        // X ke following list[] me add the id of the Y which is req.params.id
  
       
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
  
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

//UNFOLLOW USER

router.put("/:id/unfollow", async (req, res) => {
  //  check if the X id != Y id
    if (req.body.userId !== req.params.id) {
      try {
        // Y details                        id of Y
        const user = await User.findById(req.params.id);
  
        // X Details
        const currentUser = await User.findById(req.body.userId);
        console.log("Not following1");
  
        // if Y ka follower list[] me X  hai then do this
        if (user.followers.includes(req.body.userId)) {
  
         //updating follower update of Y and adding X in the follow list
          //Adding X details in Y Follower list
          await user.updateOne({ $pull: { followers: req.body.userId } });
          
          //Adding Y to following list of X
          // X[ A,B] after adding X [Y,A,B]
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          
          // X ke following list[] me add the id of the Y which is req.params.id
    
         
          res.status(200).json("User has been unfollowed");
        } else {
          res.status(403).json("You dont follow this user");
        }
    
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can't unfollow yourself");
    }
  });



module.exports = router;
