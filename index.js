const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const validateMiddleWare = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticateMiddleware')

mongoose.connect('mongodb://localhost/my_database', () => console.log('database connected') )


const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/posts/store',validateMiddleWare)
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.listen(4000, () => {
    console.log('App listen on port 4000')
})

global.loggedIn = null
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'))
