const Post = require('../dataBase/models/post')

module.exports = async(req,res) => {
        const post =  await (await Post.findById(req.params.id)).populate('author')
        console.log(post)
        res.render('post',{ 
            post
       })
}
