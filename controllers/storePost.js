const Post = require('../dataBase/models/post')

module.exports = (req, res) => {
    Post.create({ ...req.body, author: req.session.userId }, (error, post) => {
        if (post) { res.redirect('/') }
        console.error(error.message)
    });
}