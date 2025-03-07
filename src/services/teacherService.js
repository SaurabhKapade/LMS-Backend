const { findStudent } = require("../repository/studentRepository");
const { findTeacher, createTeacher } = require("../repository/teacherRepository");

async function insertTeacher(teacherData){
    const teacher = await findTeacher(teacherData)
    const student = await findStudent(teacherData)
    if(teacher || student){
        throw{
            reason:'email or mobile no. already exists in database',
            statusCode:404,
            message:'Can\'t register Instructor'
        }
    }
    const newTeacher = await createTeacher({
        firstName:teacherData.firstName,
        lastName:teacherData.lastName,
        mobNo:teacherData.mobNo,
        email:teacherData.email,
        password:teacherData.password,
        role:teacherData.role,
        created_courses:[],
        avtar:'',
        avtar_id:'',
        about:'',
    })
    if(!newTeacher){
        console.log('not created teacher')
        throw{
            reason:'cannot register Teacher',
            statusCode:500,
            message:'Teacher not registered'
        }
    }
    return newTeacher
}
module.exports={
    insertTeacher
}