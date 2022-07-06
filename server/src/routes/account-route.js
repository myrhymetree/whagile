const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account-controller');
const { authJwt } = require("../middleware");

router.get('/members', [authJwt.verifyToken], AccountController.selectAccounts);
router.get('/member', [authJwt.verifyToken], AccountController.selectAccount);
router.put('/member', [authJwt.verifyToken], AccountController.updateAccount);
router.post('/register', AccountController.registerAccount);
router.post('/login', AccountController.loginAccount);
router.get('/emailAuth', AccountController.emailAuth);
router.get('/search', AccountController.searchID);
router.put('/temppwd', [authJwt.verifyToken], AccountController.updateTempPwd);
router.put('/updatepwd', [authJwt.verifyToken], AccountController.updatePwd);
router.post('/authsend', [authJwt.verifyToken], AccountController.authNumberSend);
router.put('/email', [authJwt.verifyToken], AccountController.updateEmail);

module.exports = router;