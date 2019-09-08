const jwt = require('jsonwebtoken')
const models = require('../models/index')
const Topic  = models.Topic
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Adding a topic
exports.add_topic = (req, res, next) => {

   jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
       if (err) {
           res.sendStatus(403)
       } else {
        Topic.create({  
            title: req.body.title,
            content: req.body.content,
            userId: authData.id
        }).then(topic => {    
            res.status(201).json({
                message: 'You have successfully added the topic',
                topic
            })
            
        }).catch(err => res.status(500).json({
            error: err.message
        }))
       }
   })   
}

// Get a topic

exports.topics_get_topic = (req, res, next) => {
    const id = req.params.topicId;
    Topic.findByPk(id).then(topic => {
        res.status(200).json({
            topic
        })
    })
}

// Updating the topic

exports.topic_update = (req, res, next) => {
    const topicId = req.params.topicId;
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            // Check userID
            Topic.findOne({ where: { userId: authData.id } })
            .then((topic) => {
                if (topic && topic.id == topicId) {
                    Topic.update(
                        { title: req.body.title, content: req.body.content }, 
                        { where: {id: topicId} 
                    }).then(() => {
                        res.status(201).json({
                            message: 'You have successfully updated the topic',   
                        })
                    }).catch(err => res.status(500).json({
                        error: err.message
                    }))  
                } else {
                    res.status(403).json({
                        message: 'Is not your topic or is not a valid id'
                    })
                }
            })
        }
    })
    
}

// Deleting a topic

exports.topic_delete = (req, res, next) => {
    const id = req.params.topicId;
    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            // Check userID
            Topic.findOne({ where: { userId: authData.id } })
            .then((topic) => {
                
                if (topic.id == id) {
                    Topic.destroy({
                        where: { id: id }
                    }).then((rowDeleted) => { 
                        if (rowDeleted === 1){
                            res.status(200).json({
                                message: 'Deleted successfully'
                            })
                        }
                    }).catch(err => res.status(500).json({
                        error: err.message
                    })
                    )
                } else {
                    res.status(500).json({
                        message: 'It has not been deleted'
                    })
                }
            })
        }
    })
}

// Get all topics

exports.get_all = (req, res, next) => {

    const page = req.query.page ? parseInt(req.query.page) : 1      
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5  
    

    const offset = parseInt((page - 1)  * pageSize)
    const limit = pageSize 

    Topic.findAll({
          limit, 
          offset,
          order: [['id', 'ASC']]
        }).then((topics) => {
            res.status(200).json({
                topics
            })
        }).catch((err) => res.send(err))

}

// Search

exports.topic_search = (req, res, next) => {
    const topic = req.query.topic;

    Topic.findAll(
        { where: { 'title': { [Op.like]: '%' + topic +'%' } } 
    }).then((pro) => {
        res.status(200).json({
            pro
        })
    }).catch(err => res.status(500))
    
}