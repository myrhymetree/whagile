const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project-controllers');

router.get('/', ProjectController.selectProjects);
router.get('/:projectCode', ProjectController.selectProject);
router.post('/', ProjectController.registProject);
router.put('/:projectCode', ProjectController.modifyProject);
router.delete('/', ProjectController.removeProject);
router.get('/:projectCode/member', ProjectController.findProjectMember);
router.delete('/:projectCode/removeProjectMember/:memberCode', ProjectController.removeProjectMember);
router.post('/invitation', ProjectController.inviteMember);
router.get('/:projectCode/joinedMember/:memberCode', ProjectController.registProjectMember);
router.post('/:projectCode/joinedNewMember', ProjectController.signUpProjectMember);
router.put('/:projectCode/member/:memberCode/', ProjectController.modifyAuthorityOfMember);

module.exports = router;