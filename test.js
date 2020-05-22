const express = require('express')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')

const app = new express()
mongoose.connect('mongodb://localhost/blog-post-node')

app.use(expressEdge.engine)

app.get('/posts/new', async(req,res) => {
     const post =  await Post.findById(req.params.id)
     console.log(post)
     res.render('post',{ 
         post
    })
 }

 app.post('/posts/store', (req,res) => {
    Post.create(req.body, (error,post) => {
         res.redirect('/')
     })
 })
