const Post = require('../dataBase/models/post')

module.exports = (req,res) => {
        Post.create({
            ...req.body,
            author:req.session.userId 
        },
            (error,post) => {
            res.redirect('/')
        });
    }