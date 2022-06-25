const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account-controller');

router.get('/members', AccountController.selectAccounts);
router.post('/register', AccountController.registerAccount);
router.post('/login', AccountController.loginAccount);
router.post('/logout', AccountController.logoutAccount);


module.exports = router;