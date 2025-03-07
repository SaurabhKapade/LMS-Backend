const express = require('express');
const { registerTeacher } = require('../controllers/teacherController');
const teacherRouter = express.Router();

teacherRouter.post('/',registerTeacher)
module.exports=teacherRouter