const { login } = require("../services/authService");

async function loginUser(req,res){
    try{
        const loginPayload = req.body;
        const response = await login(loginPayload)
        res.cookie('authToken',response.Token,{
            httpOnly:true,
            secure:false,
            maxAge:24*60*60*1000
        })
        return res.status(200).json({
            success:true,
            message:'login Successfully',
            data:response.userData,
            error:{}
        })
    }catch(error){
        return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        })
    }
}
async function logOut(req,res){

    res.cookie('authToken',"",{
        httpOnly:true,
        secure:false
    })
    return res.status(200).json({
        success:true,
        message:'loggedOut Successfully',
        data:{},
        error:{}
    })

}
module.exports = {
    loginUser,
    logOut
}