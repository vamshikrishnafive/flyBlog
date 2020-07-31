//package's
const mongoose = require('mongoose')
const express = require('express')
const edge = require('edge.js')
const expressEdge = require('express-edge')
const expressSession = require('express-session')
const connectmongo = require('connect-mongo')
const connectFlash = require('connect-flash')

//controller's
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const logoutcontroller = require('./controllers/logout')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const stroeUserController = require('./controllers/storeUser')
const logincontroller = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

//middleware's
const storePost = require('./middleware/storePost')
const auth = require('./middleware/auth')
const redirectIfAuthenticted = require('./middleware/redirectIfAuthenticated')

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

mongoose.connect('mongodb://localhost/blog-post-node', {
    useUnifiedTopology: true, 
    useNewUrlParser: true
}).then(console.log("connected to DataBase"))

app.use(express.static('public'))
app.use(expressEdge.engine)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/posts/store',storePost)

app.set('views',`${__dirname}/views`)

app.use('*',(req,res,next) => {
    edge.global('auth',req.session.userId)
    next()
})

//routing
app.get('/', homePageController)
app.get('/post/:id', getPostController)
app.get('/posts/new', auth, createPostController)
app.get('/auth/logout',auth,logoutcontroller)
app.post('/posts/store',auth, storePost,storePostController)
app.get('/auth/login',redirectIfAuthenticted,logincontroller)
app.post('/user/login',redirectIfAuthenticted,loginUserController)
app.post('/user/register', redirectIfAuthenticted, stroeUserController)
app.get('/auth/register',redirectIfAuthenticted, createUserController)
app.get((req,res) => res.render('pageNotFound'))


app.listen(3000,
    console.log("server is started")
)
