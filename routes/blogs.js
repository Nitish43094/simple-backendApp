const express = require('express')
const route = express.Router();

const {createPost,getAllPost} = require('../controllers/postController')
const {likePost} = require('../controllers/likeController')
const {createComment} = require('../controllers/commentController')

route.post('/post/create',createPost)
route.get('/post/all',getAllPost)

route.post('/post/like',likePost)

route.post('/post/comment',createComment)

module.exports = route;