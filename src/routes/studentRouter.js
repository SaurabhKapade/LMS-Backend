const express = require('express')
const { registerStudent, fetchStudents, fetchStudent } = require('../controllers/studentController')
const studentRouter = new express.Router()

studentRouter.post('/',registerStudent);
studentRouter.get('/getAll',fetchStudents);
studentRouter.get('/get/:id',fetchStudent);
module.exports = studentRouter