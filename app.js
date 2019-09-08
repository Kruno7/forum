const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const checkAuth = require('./middleware/check-auth')
// Database

const sequelize = require('./config/db');

// Test DB
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err))

const userRoutes    = require('./routes/users')
const topicRoutes   = require('./routes/topics')
const commentRoute  = require('./routes/comments')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

//Route whitch should handle requests

app.use('/users', userRoutes)
app.use('/topics', topicRoutes)
app.use('/comments', commentRoute)



app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})



app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;