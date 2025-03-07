const nodemailer = require('nodemailer')
const { APP_PASS } = require('../config/serverConfig')

const transporter = nodemailer.createTransport({
    secure:true,
    host:'smtp.gmail.com',
    port:465,
    auth:{
        user:'saurabhkapade60@gmail.com',
        pass:APP_PASS
    }
})
async function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg

    })
    console.log('mail sended')
}
module.exports = {
    sendMail
}