const express = require('express');
const { isLoggedIn, isInstructor } = require('../Validation/authValidator');
const { addNewCourse, fetchAllCourses, fetchCourseById, fetchCourseByTeacher, insertModule, removeCourseSession, addNewComment, enrollStudent } = require('../controllers/courseController');
const { uploader } = require('../middlewares/multerMiddleware');
const courseRouter = express.Router();
courseRouter.post('/add',isLoggedIn,isInstructor,uploader.single('thumbNail'),addNewCourse)
courseRouter.get('/getAll',fetchAllCourses)
courseRouter.get('/get/:id',fetchCourseById)
courseRouter.get('/get/teacher/course',fetchCourseByTeacher)
courseRouter.post('/add/module/:courseId',isLoggedIn,isInstructor,uploader.single('lecture'),insertModule)
courseRouter.post('/remove/module/:courseId',isLoggedIn,isInstructor,removeCourseSession)
courseRouter.post('/add/comment/:courseId',isLoggedIn,isInstructor,addNewComment)
courseRouter.post('/enroll',isLoggedIn,enrollStudent)
module.exports = courseRouter