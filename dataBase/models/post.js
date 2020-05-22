
const mongoose = require('mongoose')


const postSechema = new mongoose.Schema({
        title : String,
        description: String,
        contents: String,
        author : {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        createdAt: {
            type: Date,
            default:Date.now
        }
    })

const Post = mongoose.model('Post', postSechema)

module.exports = Post

