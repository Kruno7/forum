const jwt = require('jsonwebtoken')
const models = require('../models/index')
const Comment  = models.Comment
const Topic = models.Topic
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Adding a comment on a topic

exports.add_comment = (req, res, next) => {

    const id = req.params.topicId;

    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
       if (err) {
           res.sendStatus(403)
       } else {
        Comment.create({  
            content: req.body.content,
            userId: authData.id,
            topicId: id
        }).then(topic => {    
            res.status(201).json({
                message: 'You have successfully added the comment',
                topic
            })    
        }).catch(err => res.status(500).json({
            error: err.message
        }))
       }
    })
}

// Geting comments on the topic

exports.get_comment = (req, res, next) => {
    const id = req.params.topicId
    
    Comment.findAll({
        include: [{
          model: Topic,
          as: 'topics',
          where: {id: id}
         }]
      }).then(comment => {
        
        res.status(200).json({
            comment
        })
        
      }).catch((err) => res.send(err))

}


exports.comment_update = (req, res, next) => {
    const commentId = req.params.commentId
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            Comment.findOne({ where: { userId: authData.id } })
            .then((comment) => {
                if (comment) {
                    if (comment.id == commentId) {
                        Comment.update(
                            { content: req.body.content }, 
                            { where: {id: commentId} 
                        }).then(() => {
                            res.status(201).json({
                                message: 'You have successfully updated the comment',   
                            })
                        }).catch(err => res.status(500).json({
                            error: err.message
                        }))
                    }
                } else {
                    res.status(401).json({
                        message: 'Is not your comment or is not a valid id'
                    })
                } 
            }).catch(() => res.status(500))
        }
    })
}

exports.comment_delete = (req, res, next) => {
    const commentId = req.params.commentId
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            //console.log("Error")
            res.sendStatus(403)
        } else {
            Comment.findOne({ where: { userId: authData.id } })
            .then((comment) => {
                if (comment && comment.id == commentId) {
                    Comment.destroy({
                        where: { id: commentId }
                    }).then(function(rowDeleted){ 
                        if(rowDeleted === 1){
                            res.status(200).json({
                                message: 'Deleted successfully'
                            })
                        }
                    }).catch(err => res.send(err))
                } else {
                    res.status(401).json({
                        message: 'Is not your comment or is not a valid id'
                    })
                }
            }).catch(() => res.status(500))
        }
    })
}

exports.comment_search = (req, res, next) => {
    const comment = req.query.comment;

    Comment.findAll(
        { where: { 'content': { [Op.like]: '%' + comment +'%' } } 
    }).then((pro) => {
        res.status(200).json({
            pro
        })
    })
}

                