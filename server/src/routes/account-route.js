const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account-controller');

router.get('/members', AccountController.selectAccounts);
router.post('/register', AccountController.registerAccount);
router.post('/login', AccountController.loginAccount);
router.get('/emailAuth', AccountController.emailAuth);
router.get('/search/:id', AccountController.searchID);
router.put('/update-pwd', AccountController.updatePwd);


module.exports = router;