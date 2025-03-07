const Course = require("../schema/courseSchema")
const { badRequestError } = require("../utils/badRequestError")
const { internalServerError } = require("../utils/internalServerError")
const { notFoundError } = require("../utils/notFoundError")
const { findTeacher } = require("./teacherRepository")

async function createCourse(courseData,teacher){
    try{
        let user = await findTeacher({email:teacher.email})
        if(!user){
            throw new badRequestError(['Teacher not found'])
        }
        const course = await Course.create(courseData)
        user.created_courses.push(course)
        await user.save()
        return course
    }catch(error){
        if(error.name==='ValidationError'){
            const errorMessageList =  Object.keys(error.errors).map((property)=>{
                 return error.errors[property].message
              })

              throw new badRequestError(errorMessageList)
          }
          console.log(error)
          console.log(error.name)
          throw new internalServerError();
    }
}
async function getAllCourses(){
    try{
        console.log('courses repo ')
        const courses = await Course.find();
        return courses
    }catch(error){
        console.log(error.name)
        throw new internalServerError()
    }
}
async function getCourse(courseId){
    try{
        const course = await Course.findById(courseId)
        return course
    }catch(error){
        console.log(error)
        throw new internalServerError()
    }
}
async function getCourseByTeacher(teacherName){
    try{
        console.log(teacherName)
        const courses = await Course.find().populate('teacher');
        console.log(courses)
        let validCourses = courses.filter((course)=> course.teacher.firstName===teacherName)
        return validCourses
    }catch(error){
        console.log(error)
    }
}


async function addModule(courseId, moduleData) {
    try {
        console.log('moduleData is:', JSON.stringify(moduleData.sessions, null, 2));
       
        const result = await Course.updateOne(
            { _id: courseId },
            {
                $push: {
                    sessions: {
                        title: moduleData.sessions.title,
                        session: {
                            public_id: moduleData.sessions.session.public_id,
                            secure_url: moduleData.sessions.session.secure_url,
                            comments: [], // Empty array for comments initially
                        },
                    },
                },
                $inc: { session_count: 1 },
            }
        );

        console.log('Update Result:', result);
        return result;
    } catch (error) {
        console.error('Error in addModule:', error);
        if (error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            throw new Error(errorMessageList.join(', '));
        }
        throw new Error('Internal server error');
    }
}

async function getSessionByName(courseId,sessionName){
    try{
        const course = await Course.findOne(
            {_id:courseId}
        )
        const response = course.sessions.filter(module=>{
            return module.title===sessionName
        })
        return response[0]
    }catch(error){
        console.log(error)
        throw new internalServerError()
    }
}

async function addComment(courseId, sessionName, commentData, student) {
    try {
        const result = await Course.updateOne(
            {
                _id: courseId,
                "sessions.title": sessionName,
            },
            {
                $push: {
                    "sessions.$.session.comments": { 
                        comment: commentData,
                        comment_creator: student.id,
                    },
                },
            }
        );

        console.log('Comment added successfully:', result);
        return result;
    } catch (error) {
        console.error('Error in addComment:', error);
        throw new Error('Failed to add comment');
    }
}


async function deleteSession(courseId,sessionName){
    try{
        const result = await Course.updateOne(
            {_id:courseId},
            {
                $pull:{
                    sessions:{
                        title:sessionName
                    }
                },
                $inc: { session_count: -1 },
            },
            
            
        )
        return result
    }catch(error){
        console.log(error)
        throw new internalServerError()
    }
}




module.exports={
    createCourse,
    getAllCourses,
    getCourse,
    getCourseByTeacher,
    addModule,
    deleteSession,
    getSessionByName,
    addComment
}