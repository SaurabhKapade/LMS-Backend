const { findStudent, createStudent, getAllStudents, getStudentById } = require("../repository/studentRepository");
const { findTeacher } = require("../repository/teacherRepository");
const { notFoundError } = require('../utils/notFoundError')
async function insertStudent(studentData){
    const student = await findStudent(studentData)
    const teacher = await findTeacher(studentData)
    if(student || teacher){
        throw{
            reason:'email or mobile no. already exists in Database',
            statusCode:404,
            message:'can\'t register Student'
        }
    }
    const newStudent = await createStudent({
        firstName:studentData.firstName,
        lastName:studentData.lastName,
        mobNo:studentData.mobNo,
        email:studentData.email,
        password:studentData.password,
        role:studentData.role,
        enrolled_courses:[],
        avtar:'',
        avtar_id:'',
        about:'',
        achievements:[],
    })
    if(!newStudent){
        throw{
            reason:'cannot register Student',
            statusCode:500,
            message:'Student not registered'
        }
    }
    return newStudent
}
async function getStudents(){
    const students = await getAllStudents();
    if(!students){
        throw new notFoundError('Students')
    }
    return students
}
async function getStudent(studentId){
    const student = await getStudentById(studentId)
    if(!student){
        throw new notFoundError('Student',500)
    }
    return student
}
module.exports={
    insertStudent,
    getStudents,
    getStudent
}