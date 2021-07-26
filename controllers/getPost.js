const Post = require('../dataBase/models/post')

module.exports = async (req, res) => {
    try {
        const post = await (await Post.findById(_id = req.query.id)).populate('author', 'username')
        res.render('post', { post })
    } catch (error) {
        console.error(error.message)
    }

}
