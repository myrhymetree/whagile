const express = require('express');
const router = express.Router();

const BacklogController = require('../controllers/backlog-controller');

router.get('/', BacklogController.findAllBacklogs);
// router.get('/:backlogCode', BacklogController.findBacklogsByBacklogCode);

module.exports = router;