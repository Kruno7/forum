const express = require('express')
const router  = express.Router()
const bcrypt  = require('bcrypt')
const jwt     = require('jsonwebtoken');
const User    = require('../models/user')

const saltRounds = 10;

router.post('/signup', (req, res, next) => {
    
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
   
        const user = new User({
            email: req.body.email,
            password: hash
        })
        let { email, password} = user
        User.create({
            email, password
        })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'User created'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    
})

router.post('/login', (req, res, next) => {
    
    User.findOne({ where: { email: req.body.email } })
    .then(user => {
        if (user === null) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, 'secretkey')

            res.status(200).json({
                message: 'Auth success',
                token: token
            })
        } else {
            res.status(401).json({
                message: 'Auth failed'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router

