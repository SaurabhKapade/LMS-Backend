const Teacher = require("../schema/teacherSchema");

async function findTeacher(teacherData){
    try{
        let teacher = await Teacher.findOne({email:teacherData.email})
        if(!teacher){
            teacher = await Teacher.findOne({mobNo:teacherData.mobNo})
        }
        return teacher;
    }catch(error){
        console.log(error)
    }
}

async function createTeacher(teacherData){
    try{
        const teacher = await Teacher.create({...teacherData})
        return teacher;
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
module.exports = {
    findTeacher,
    createTeacher
}
