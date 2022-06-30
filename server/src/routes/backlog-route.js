const express = require('express');
const router = express.Router();

const BacklogController = require('../controllers/backlog-controller');

router.get('/', BacklogController.findAllBacklogs);
router.get('/:backlogCode', BacklogController.findBacklogsByBacklogCode);
router.post('/', BacklogController.registNewBacklog);
router.put('/', BacklogController.editBacklog);

module.exports = router;