const { insertTeacher } = require("../services/teacherService");

async function registerTeacher(req,res){
    
    try{
        const teacher = await insertTeacher(req.body)
        console.log(req.body)
        return res.json({
            success:true,
            message:'Instructor registered successfully',
            data:teacher,
            error:{},
        })
    }catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.reason,
            data:{},
            error:error
        })
    }
}
module.exports = {
    registerTeacher
}