const express = require('express')
const serverConfig = require('./src/config/serverConfig')
const connectDB = require('./src/config/dbConfig')
const studentRouter = require('./src/routes/studentRouter')
const teacherRouter = require('./src/routes/teacherRouter')
const authRouter = require('./src/routes/authRouter')
const CookieParser = require('cookie-parser')
const cors = require('cors')
const { isLoggedIn, isInstructor } = require('./src/Validation/authValidator')
const courseRouter = require('./src/routes/courseRouter')
const { uploader } = require('./src/middlewares/multerMiddleware')
const { cloudinary } = require('./src/config/cloudinaryConfig')
const fs = require('fs')
const { sendMail } = require('./src/Helpers/sendMail')
const app = express()

app.use(cors({
    origin:'http://localhost:5174',
    credentials:true,
}))

app.use(CookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use('/student',studentRouter)
app.use('/teacher',teacherRouter)
app.use('/auth',authRouter)
app.use('/courses',courseRouter)


app.listen(serverConfig.PORT , async()=>{
    await connectDB()
    console.log('server got started at port',serverConfig.PORT)
})

app.get('/ping',async (req,res)=>{
    // await sendMail('skapade65@gmail.com','This is SUBJECT','Welcome to LearnEdge')
    return res.json({
        success:true,
        message:'pong',
    })
})



// app.post('/photo',uploader.single('file'),async(req,res)=>{
//     const result = await cloudinary.uploader.upload(req.file.path,
//         {resource_type:'auto'}
//     )
//     console.log('result is ',result)
//     fs.unlink(req.file.path,(err)=>{
//         if(err){
//             console.log(err)
//         }else{
//             console.log('file deleted')
//         }
//     })
//     return res.json({
//         message:'ho gaya bhai upload',
//         data:result
//     })
// })
// app.post('/photo/del',async(req,res)=>{
//     const id = req.body.public_id
//     try{
//         const result = await cloudinary.uploader.destroy(id,
//             {resource_type:'image'}
//         );
//         console.log(result)
//         return res.json({
//             success:false,
//             message:'resource deleted',
//             error:{},
//             data:result
//         })
//     }catch(error){
//         return res.json({
//             success:false,
//             message:'cant delete photo',
//             error:error,
//             data:{}
//         })
//     }
// })

