const Post = require('../models/postModel')

exports.createPost = async(req,res) =>{
    try{
        const {title,body} = req.body;
        console.log(title," ",body)
        if(!title || !body){
            return res.status(400).json({
                success:false,
                message:"required the title and body"
            })
        }
        const post = await Post.create({title,body});
        res.status(201).json({
            success:true,
            data:post,
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Post create करते समय error आया",
            error:err.message,
        });
    }
}

exports.getAllPost = async(req,res) =>{
    try{
        const response = await Post.find()
                        .populate("comments")
                        .populate("likes")
        res.status(200).json({
            success:true,
            data:response,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

exports.getPostById = async(req,res) =>{
    try{
        const {id} = req.params
        if(!id){
            return res.status(403).json({
                success:false,
                message:"Post Id is required"
            })
        }
        const response = await Post.findById(id)
                                .populate('comments')
                                .populate('likes')
        res.status(200).json({
            success:true,
            data:response,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

exports.updatePost = async(req,res) =>{
    try{
        const {id} = req.params
        const {title,body} = req.body
        if(!title || !body){
            return res.status(400).json({
                success:false,
                message:"required the title and body"
            })
        }
        const response = await Post.findByIdAndUpdate(
            id,
            {title,body},
            {new:true},
        )
        if(!response){
            return res.status(400).json({
                success:false,
                message:"Data not found this given id",
            })
        }
        res.status(200).json({
            success:true,
            data:response,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
