const serverConfig = require('./serverConfig')

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:serverConfig.CLOUDINARY_CLOUD_NAME,
    api_key:serverConfig.CLOUDINARY_API_KEY,
    api_secret:serverConfig.CLOUDINARY_API_SECRET
})

module.exports={
    cloudinary
}