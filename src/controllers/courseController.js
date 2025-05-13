const { createNewCourse, getCourses, getCourseById, getCourseByTeacherName, addModuleInCourse, removeSession, commentOnSession, enrollStudentInCourse } = require("../services/courseService")
const appError = require("../utils/appError")

async function addNewCourse(req,res){
    try{
        const Course = await createNewCourse({
            ...req.body,
            imagePath:req.file.path
            },
            req.user
        )
        return res.status(201).json({
            success:true,
            message:'course created successfully',
            data:Course,
            error:{}
        })
    }catch(error){
        console.log(error)
        if(error instanceof appError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{}
            })
        }

        return res.status(500).json({
            success:false,
            message:"cant create course",
            error:error,
            data:{}
        })
    }
}
async function fetchAllCourses(req,res){
    try{
        const response = await getCourses();
        return res.status(200).json({
            success:true,
            message:'all courses fetched',
            data:response,
            error:{}
        })
    }catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            error:error,
            data:{}
        })
    }
}
async function fetchCourseById(req,res){
    try{
        console.log('search by id')
        const id = req.params.id
        console.log(id)
        const course = await getCourseById(id)
        return res.status(200).json({
            success:true,
            message:'course found successfully',
            data:course,
            error:{}
        })
    }catch(error){
        res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        })
    }
}
async function fetchCourseByTeacher(req,res){
    try{
        const name = req.body.teacherName
        const course = await getCourseByTeacherName(name)
        return res.status(200).json({
            success:true,
            message:'courses found successfully',
            data:course,
            error:{}
        })
    }catch(error){
        res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        })
    }
}
async function insertModule(req,res){
    // const lecturePath = req.file.path
    // console.log('path ',lecturePath)
    console.log('body',req.body)
    try{
        const course = await addModuleInCourse(req.params.courseId,req.body)
        return res.status(200).json({
            success:true,
            message:'courses found successfully',
            data:course,
            error:{}
        })
    }catch(error){
        res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        })
    }
}


async function removeCourseSession(req,res){

    console.log('body',req.body)
    try{
        const course = await removeSession(req.params.courseId,req.body.name)
        return res.status(200).json({
            success:true,
            message:'Session removed successfully',
            data:course,
            error:{}
        })
    }catch(error){
        res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        })
    }
}


async function addNewComment(req,res){

    console.log('body',req.body)
    try{
        const course = await commentOnSession(req.params.courseId,req.body.name,req.body.comment,req.user)
        return res.status(200).json({
            success:true,
            message:'comment added',
            data:course,
            error:{}
        })
    }catch(error){
        res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        })
    }
}

async function enrollStudent(req,res){
    // courseId,studentId
    console.log("data is ",req.body)
    try{
        const response = await enrollStudentInCourse(req.body.courseId,req.body.email)
         return res.status(200).json({
            success:true,
            message:'enrollMent success',
            data:response,
            error:{}
        })
    }catch(error){
        console.log('err is ',error)
        res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        })
    }

}

module.exports = {
    addNewCourse,
    fetchAllCourses,
    fetchCourseById,
    fetchCourseByTeacher,
    insertModule,
    removeCourseSession,
    addNewComment,
    enrollStudent
}