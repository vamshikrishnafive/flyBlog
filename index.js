//package's
const mongoose = require('mongoose')
const express = require('express')
const edge = require('edge.js')
const expressEdge = require('express-edge')
const expressSession = require('express-session')
const connectmongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const dotenv = require("dotenv")
dotenv.config();

//incoming
const storePost = require('./middleware/storePost')
const postRoute = require('./routes/post')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

//main
const app = new express()
const mongoStore = connectmongo(expressSession);

app.use(connectFlash())
app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    store : new mongoStore({
        mongooseConnection:mongoose.connection
    })
}))

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex:true
}).then(console.log("connected to DataBase"))

app.use(express.static('public'))
app.use(expressEdge.engine)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('*', (req,res,next) => {
    edge.global('auth',req.session.userId)
    next()
})

if(process.env.NODE_ENV === "production"){
app.set('views',`${__dirname}/views`)
}

//routing
app.use('/posts/store',storePost)
app.use('/', postRoute)
app.use('/', userRoute)
app.use('/', authRoute)

//sever
const PORT = process.env.PORT || 4001; //AFAGPn4p32EK61rq
app.listen(PORT, 
    console.log(`server is started ${PORT}`)
)
