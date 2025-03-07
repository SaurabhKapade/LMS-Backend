const dotenv = require('dotenv')
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    APP_PASS:process.env.APP_PASS,
}