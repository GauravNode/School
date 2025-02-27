const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController')

router.post('/school-register', schoolController.registerSchool);
router.post('/school-login', schoolController.loginSchool);

module.exports = router;
