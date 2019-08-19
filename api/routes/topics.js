const express = require('express')
const router  = express.Router()
const db = require('../config/database')
const Topic = require('../models/topic')
const checkAuth = require('../middleware/check-auth')

//Get topic

router.get('/', checkAuth, (req, res) => {
    Topic.findAll()
        .then(topic => {
            console.log(topic)
                res.status(200).json({
                message: 'Handling GET requests to /topics'
            })
        })
        .catch(err => console.log(err))
}) 

//Add topic

router.post('/add', checkAuth, (req, res) => {
     const topic = new Topic({
        title: req.body.title,
        text:  req.body.text
    })
    let { title, text} = topic

    //Insert into table
    Topic.create({
        title,
        text
    })
    .then(result => {
        //console.log(result)
        res.status(201).json({
            message: 'Handling POST requests to /topic',
            topic: topic
        })
    })
    .catch(err => console.log(err))
})

module.exports = router