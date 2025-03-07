const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/serverConfig')
const { unauthorisedError } = require('../utils/unauthorisedError')
async function isLoggedIn(req,res,next){
    const token = req.cookies['authToken']
    if(!token){
        return res.status(400).json({
            success:false,
            data:{},
            message:'no auth token provided',
            error:'not authenticated'
        })
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        if(!decoded){
            throw new unauthorisedError()
        }
        req.user={
            email:decoded.email,
            id:decoded.id,
            role:decoded.role
        }
        
    }catch(error){
        return res.status(400).json({
            success:false,
            data:{},
            message:'invalid token provided',
            error:error
        })
    }

    next()
}
async function isInstructor(req,res,next){
    const loggedInUser = req.user
    if(loggedInUser.role==='TEACHER'){
        next()
    }else{
        res.status(400).json({
            success:false,
            data:{},
            message:'You are not authorised to do this action',
            error:{
                statusCode:401,
                message:'Unauthorised user for this action'
            }
        })
    }
        
}
module.exports={
    isLoggedIn,
    isInstructor
}