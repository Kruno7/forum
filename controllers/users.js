//const bcrypt = require('bcrypt')
const bcrypt = require('bcrypt-nodejs')
const jwt    = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const generator = require('generate-password')
const models = require('../models')


const User = models.User;

//const saltRounds = 10;
const  saltRounds = bcrypt.genSaltSync(10)

exports.user_signup = (req, res, next) => {

    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
            return res.status(409).json({
                message: "Mail exists"
            });
        } else {
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
               
            if (req.body.password === req.body.rep_password) {
                
                User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                })
                .then(() => {
                    res.status(201).json({
                        message: 'You have successfully registered',
                        request: {
                            type: 'POST',
                            url: 'http://localhost:5006/users/login'
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err.message
                    })
                }) 
            } else {
                res.status(403).json({
                    message: "Passwords are not the same"
                })
            }
        }
    }) 
    
}


exports.user_login = (req, res, next) => {
  
    User.findOne({ where: { email: req.body.email } })
    .then(user => {
        if (user === null) {
            return res.status(404).json({
                message: 'Mail not found, user doesn\'t exist'
            })
        } 

        if (bcrypt.compareSync(req.body.password, user.password)) {
   
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_KEY, { expiresIn: '360s'})

            res.status(200).json({
                message: 'Auth success',
                token: token,
                
            })
        } 
        else {
            res.status(401).json({
                message: ' 3 - Auth failed'
            }) 
        } 
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

exports.user_resetpassword = (req, res, next) => {
    User.findOne({ where : { email : req.body.email } })
        .then(user => {
            if (!user) {
                res.json({
                    message: 'Email was not found'
                })
            } else {
            const newpassword = generator.generate({
                length: 8,
                numbers: true
            });
            const hash = bcrypt.hashSync(newpassword, saltRounds);
                User.update(
                    { password: hash },
                    { where: { id: user.id } }
                )
                .then(() => {
                    
            const transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASSWORD
                }
            })
                
            const mailOptions= {
                from: '"Test Server" <test@example.com>',
                to: req.body.email,
                subject: "Email Test",
                text: "This is an email test using Mailtrap.io \n" + "This is your new password: " + newpassword
            };
                
            transporter.sendMail(mailOptions, (err, info) => {
                if (err){
                    //console.log(err);
                    return next(err);
                }
                //console.log("Info: ", info);
                res.json({
                    message: "Email successfully sent."
                    })
                })
            })
            .catch(err =>
                handleError(err)
            )
        }
    })
}