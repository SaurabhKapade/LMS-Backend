const { JWT_SECRET } = require("../config/serverConfig");
const { findStudent } = require("../repository/studentRepository");
const { findTeacher } = require("../repository/teacherRepository");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
async function login(userDetails){
    const email = userDetails.email.trim()
    const plainPassword = userDetails.password.trim();

    let user = await findStudent({email});
    if(!user){
        user = await findTeacher({email})
    }
    if(!user){
        throw{
            message:'No user found with given email',
            statusCode:404
        }
    }
    const passwordCheck = await bcrypt.compare(plainPassword,user.password)
    if(!passwordCheck){
        throw{
            message:'Invalid password please try again later',
            statusCode:404
        }
    }
    const Token = jwt.sign({email:user.email,id:user._id,role:user.role},JWT_SECRET,{expiresIn:'24h'})
    return {
        Token,
        userData:{
            email:user.email,
            id:user._id,
            firstName:user.firstName
        }
    }

}

module.exports = {
    login
}