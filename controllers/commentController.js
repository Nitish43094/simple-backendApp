const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

exports.createComment = async(req,res) =>{
    try{
        const {post,user,body} = req.body
        if(!post || !user || !body){
            return res.status(409).json({
                success:false,
                message:"the post Id,user,body are required",
            })
        }
        const avilablePost = await Post.findById(post)
        if(!avilablePost){
            return res.status(408).json({
                success:false,
                message:"This post id did not match"
            })
        }
        const comment = await Comment.create({post,user,body})
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            {$push:{comments:comment._id}},
            {new:true}
        )
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