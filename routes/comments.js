const express = require('express')
const router  = express.Router()

const CommentController = require('../controllers/comments')
const verifyToken = require('../middleware/verifyToken')

router.get('/search', verifyToken, CommentController.comment_search)
router.post('/:topicId/comment', verifyToken, CommentController.add_comment)
router.get('/:topicId/comment', verifyToken, CommentController.get_comment)
router.put('/:commentId', verifyToken, CommentController.comment_update)
router.delete('/:commentId', verifyToken, CommentController.comment_delete)

module.exports = router
