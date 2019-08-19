const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    console.log(req.body.token)
    try {
        const token =  req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, 'secretkey')
        req.userData = decoded
        
        next()
    } catch (error) {
        
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
    
}