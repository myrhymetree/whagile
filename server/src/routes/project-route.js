const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project-controllers');

router.get('/projects', ProjectController.selectProjects);
router.post('/project', ProjectController.registProject);

module.exports = router;