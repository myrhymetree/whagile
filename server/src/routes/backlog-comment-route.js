const express = require('express');
const router = express.Router();
const BacklogCommentController = require('../controllers/backlog-comment-controller');

router.get('/:backlogCode', BacklogCommentController.findBacklogComments);

module.exports = router;