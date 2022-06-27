const express = require('express');
const router = express.Router();
const AuthorityController = require('../controllers/authority-controller');

router.post('/', AuthorityController.addAuth);
router.get('/', AuthorityController.viewAuths);
router.get('/:authorityCode', AuthorityController.viewAuth);
router.put('/', AuthorityController.editAuth);
router.delete('/', AuthorityController.deleteAuth);

module.exports = router;