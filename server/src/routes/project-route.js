const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project-controllers');

router.get('/projects', ProjectController.selectProjects);
router.get('/:projectCode', ProjectController.selectProject);
router.post('/', ProjectController.registProject);
router.put('/:projectCode', ProjectController.modifyProject);

module.exports = router;