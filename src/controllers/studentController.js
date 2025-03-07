const { insertStudent, getStudents, getStudent } = require("../services/studentService");

async function registerStudent(req,res){
    try{
        const student = await insertStudent(req.body);
        return res.json({
            success:true,
            message:'student registered successfully',
            data:student,
            error:{},
        })
    }catch(error){
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: {},
            error: error
        })
    }
}

async function fetchStudents(req,res){
    try{
        const response = await getStudents();
        return res.json({
            success:true,
            message:'student fetched successfully',
            data:response,
            error:{},
        })
    }catch(error){
        console.log(error.statusCode)
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        })
    }
}

async function fetchStudent(req,res){
    try{
        const response = await getStudent(req.params.id);
        return res.json({
            success:true,
            message:'student fetched successfully',
            data:response,
            error:{},
        })
    }catch(error){
        return res.json({
            success: false,
            message: error.message,
            data: {},
            error: error
        })
    }
}
module.exports={
    registerStudent,
    fetchStudents,
    fetchStudent
}