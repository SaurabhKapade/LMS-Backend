const { cloudinary } = require("../config/cloudinaryConfig")
const { uploadLecture, uploadThumbnail } = require("../Helpers/cloudinaryUploader")
const { createCourse, getAllCourses, getCourse, getCourseByTeacher, addModule, deleteSession, getSessionByName, addComment } = require("../repository/courseRepository")
const { internalServerError } = require("../utils/internalServerError")
const { notFoundError } = require('../utils/notFoundError')
const { fs } = require('fs')
async function createNewCourse(courseData,teacher){
    console.log('courseData',courseData)
    // if(courseData.imagePath){
    //     const response = await uploadThumbnail(courseData.imagePath)
    //     var id = response.public_id
    //     var imagePath = response.secure_url
    // }
    const course = await createCourse({
        title: courseData.title,
        description: courseData.description,
        teacher: teacher.id,
        category: courseData.category,
        level: courseData.level,
        price: courseData.price,
        // thumbnail:imagePath || '',
        // public_id:id,
        sessions: courseData.sessions || [], 
        outcomes: courseData.outcomes || [],  
        session_count: courseData.session_count || 0, 
        students_enrolled: courseData.students_enrolled || 0,
    },teacher)
    console.log('course is ',course)
    if(!course){
        throw{
            message:'course not created',
            statusCode:400
        }
    }
    return course
}
async function getCourses(){
    const courses = await getAllCourses();
    if(!courses){
        throw new notFoundError('Courses',404)
    }
    return courses
}
async function getCourseById(courseId){
    const course = await getCourse(courseId)
    if(!course){
        throw new notFoundError('Course',404)
    }
    return course
}
async function getCourseByTeacherName(teacherName){
    const courses = await getCourseByTeacher(teacherName)
    console.log('courses are ',courses)
    if(!courses.length>0){
        throw new notFoundError('courses',404)
    }
    return courses
}


async function addModuleInCourse(courseId, courseData) {

    const response  = await getCourse(courseId)
    if(!response){
        throw new notFoundError('course',404)
    }
    // if (lecturePath) {
    //     const response = await uploadLecture(lecturePath)
    //     var public_id = response.public_id
    //     var secure_url = response.secure_url
    // }

    const moduleData = {
        name: courseData.name,
        sessions: 
            {
                title: courseData.title,
                session: {
                    public_id: 'public_id',
                    secure_url: 'secure_url',
                    comments:[]
                },
            },
    
    };

    console.log('Prepared Module Data:', JSON.stringify(moduleData, null, 2));

    const course = await addModule(courseId, moduleData);
    console.log('course is ',course)
    if (!course) {
        throw new Error('Failed to add module');
    }
    return course;
}


async function removeSession(courseId,sessionName){
    var course = await getCourse(courseId)
    if(!course){
        throw new notFoundError('course',404)
    }
    // fetch the particular session to delete
    var course = await getSessionByName(courseId,sessionName)
    if(!course){
        throw new notFoundError('session',404)
    }
    // now delete the lecture from cloudinary 
    //{  write that function here }

    const response = await deleteSession(courseId,sessionName)
    return response 
}

async function commentOnSession(courseId,sessionName,commentData,student){
    const response = await addComment(courseId,sessionName,commentData,student)
    return response
}
module.exports={
    createNewCourse,
    getCourses,
    getCourseById,
    getCourseByTeacherName,
    addModuleInCourse,
    removeSession,
    commentOnSession
}