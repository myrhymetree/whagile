const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project-controllers');

router.get('/', ProjectController.selectProjects);
router.get('/:projectCode', ProjectController.selectProject);
router.post('/', ProjectController.registProject);
router.put('/:projectCode', ProjectController.modifyProject);
router.delete('/:projectCode', ProjectController.removeProject);
router.get('/:projectCode/member', ProjectController.findProjectMember);
router.post('/inviteMember', ProjectController.registProjectMember);
router.delete('/:projectCode/removeProjectMember/:memberCode', ProjectController.removeProjectMember);

module.exports = router;