const express = require('express');
const router = express.Router();
const SprintController = require('../controllers/sprint-controller');

router.post('/', SprintController.addSprint);
router.get('/', SprintController.viewSprints);
router.get('/history', SprintController.viewSprintHistory);
router.get('/:sprintCode', SprintController.viewSprint);
router.put('/', SprintController.editSprint);
router.delete('/', SprintController.deleteSprint);

module.exports = router;