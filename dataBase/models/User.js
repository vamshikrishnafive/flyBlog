const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const UserSechema = new mongoose.Schema({
    username: {
    type:String,
    required : [true, 'please pass your username.']
},
    email: {
        type: String,
        required :[true,'please pass your email.'],
        unique: true
},
    password: {
        type: String,
        required: [true, 'please pass your password.']
    }
})

UserSechema.pre('save', function(next){
    const user = this
    bcryptjs.hash(user.password, 10, function(error,hash) {
        user.password = hash
        next()
    })
})
                        
const User = mongoose.model('User',UserSechema)

module.exports = User