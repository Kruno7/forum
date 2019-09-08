const express = require('express')
const router  = express.Router()

const TopicController = require('../controllers/topics')
const verifyToken = require('../middleware/verifyToken')


router.get('/search', verifyToken, TopicController.topic_search)
router.get('/getAll', verifyToken, TopicController.get_all)
router.post('/add', verifyToken, TopicController.add_topic)
router.get('/:topicId', verifyToken, TopicController.topics_get_topic)
router.put('/:topicId', verifyToken, TopicController.topic_update)
router.delete('/:topicId', verifyToken, TopicController.topic_delete)


module.exports = router
