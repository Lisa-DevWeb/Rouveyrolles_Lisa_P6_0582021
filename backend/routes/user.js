const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const mdpVerify = require('../middleware/mdpValidator');

router.post('/signup', mdpVerify, userCtrl.signup); 
router.post('/login', userCtrl.login);

module.exports = router;