const Post = require('../models/postModel')
const Like = require('../models/likeModel')

exports.likePost = async(req,res) =>{
    try{
        const {post,user} = req.body;
        if(!post || !user){
            return res.status(400).json({
                success:false,
                message:"Post and User are required",
            })
        }
        // post avilable 
        const avilablePost = await Post.findById(post)
        if(!avilablePost){
            return res.status(402).json({
                success:false,
                message:"This post id did not match",
            })
        }
        // Prevent deplicaate like
        const alreadyLiked = await Like.findOne({post,user})
        if(alreadyLiked){
            return res.status(409).json({
                success:false,
                message:"this post already Liked",
            })
        }
        const like = await Like.create({post,user})
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            {$push:{likes:like._id}},
            {new:true}
        );
        res.status(200).json({
            success:true,
            data:updatedPost,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}