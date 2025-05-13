const multer = require('multer')
const path = require('path')
const storageConfiguration = multer.diskStorage({
    destination:function(req,file,next){
        next(null,'src/uploads/')
    },
    filename:function (req,file,next){
        next(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
}) 

const uploader = multer({storage:storageConfiguration})
module.exports = {
    uploader
}