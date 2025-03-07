const Student = require("../schema/studentSchema");
const { badRequestError } = require("../utils/badRequestError");
const { internalServerError } = require("../utils/internalServerError");

async function findStudent(studentData){
    try{
        let student = await Student.findOne({email:studentData.email})
        if(!student){
            student = await Student.findOne({mobNo:studentData.mobNo})
        }
        return student;
    }catch(error){
        console.log(error)
    }
}
async function createStudent(studentData){
    try{
        const student = await Student.create(studentData)
        return student;
    }catch(error){
        if(error.name==='ValidationError'){
            
            const errorMessageList = Object.keys(error.errors).map(property => {
                    return error.errors[property].message
            });

            throw new badRequestError(errorMessageList)
        }

        console.log(error)
        throw new internalServerError()   
    }
}

async function getAllStudents(){
    try{
        const students = await Student.find();
        return students
    }catch(error){
        console.log(error)
    }
}

async function getStudentById(studentId){
    try{
        const student = await Student.findById(studentId)
        return student
    }catch(error){
        console.log(error)
    }
}

module.exports={
    findStudent,
    createStudent,
    getAllStudents,
    getStudentById
}