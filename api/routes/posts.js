const router = require("express").Router();
const Post =require('../models/Post')
const User =require('../models/User')
//Create a post


router.post("/", async (req, res) => {

    const newPost = new Post(req.body);

    try{
            const savedPost= await newPost.save();
            res.status(200).json(savedPost);
    }
    catch(err){ res.status(500).json(err);}



});

//update a post

router.put("/:id", async(req, res,) => {

    try{
        const post = await Post.findById(req.params.id);
        //Checking the Post.userId === UserId
        if(post.userId === req.body.userId)
        {
                await post.updateOne({ $set:req.body});
                res.status(200).json("Post has been updated")
        }else{ res.status(403).json("You can update only your post")}
    }
    catch(err) { res.status(500).json(err);}
   

});
//delete a post

router.delete("/:id", async(req, res,) => {

    try{
        const post = await Post.findById(req.params.id);
        //Checking the Post.userId === UserId
        if(post.userId === req.body.userId)
        {
                await post.deleteOne();
                res.status(200).json("Post has been deleled")
        }else{ res.status(403).json("You can delete only your post")}
    }
    catch(err) { res.status(500).json(err);}
   

});

//like and dislike a post

router.put("/:id/like",async(req, res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            //post like[] add the useriId 
            await post.updateOne({$push:{ likes:req.body.userId}})
            res.status(200).json("Like Successfully");
        }
        //remove the IuserId frome like[] fu
        else{ await post.updateOne({$pull:{ likes:req.body.userId}});
        res.status(200).json("disliked");
    }

    }catch(err) { res.status(500).json(err);}


})
//get a post

router.get("/:id",async(req, res)=>{

    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
        
    }catch(err) { res.status(500).json(err);}
})
//Get Timeline post

router.get("/timeline/:userId",async(req,res)=>{

try{
   
    const currentUser=await User.findById(req.params.userId);
     //userPost contain all the post the user have posted
    const userPosts=await Post.find({userId:currentUser._id});
    //fetching all the friend 
    const friendPosts=await Promise.all(
        currentUser.followings.map((friendId)=>{
               return Post.find({userId:friendId});

        })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
}catch(err){ res.status(500).json(err);}

});

//get user all post 





module.exports = router;