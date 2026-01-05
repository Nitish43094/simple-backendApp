const express = require('express')
const route = express.Router();

const {createPost} = require('../controllers/postController')
route.post('/post/create',createPost)

module.exports = route;