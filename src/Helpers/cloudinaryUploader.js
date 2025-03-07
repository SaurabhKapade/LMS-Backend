const { cloudinary } = require("../config/cloudinaryConfig")
const { internalServerError } = require("../utils/internalServerError")

async function uploadLecture(lectureURL){
    try{
        const cloudinaryResponse = await cloudinary.uploader.upload(lectureURL,
            {resource_type:'video'}
        )
        return cloudinaryResponse
    }catch(error){
        console.log(error)
        throw new Error('Failed to upload Lecture');
    }
}

async function uploadThumbnail(thumbnail){
    try{
        const cloudinaryResponse = await cloudinary.uploader.upload(thumbnail)
        return cloudinaryResponse
    }catch(error){
        console.log(error)
        throw new Error('Failed to upload Lecture');
    }
}


async function uploadAvatar(image){
    try{
        const cloudinaryResponse = await cloudinary.uploader.upload(image)
        return cloudinaryResponse
    }catch(error){
        console.log(error)
        throw new Error('Failed to upload Lecture');
    }
}

async function deletePhoto(public_id){
    try{
        const response = await cloudinary.uploader.destroy(public_id)
        return response
    }catch(error){
        console.log(error);
        throw new Error('cant Delete image')
    }
}
async function deleteLecture(public_id){
    try{
        const response = await cloudinary.uploader.destroy(public_id,
            {resource_type:'video'}
        )
    }catch(error){
        console.log('error');
        throw new Error('cant delete Lecture')
    }
}
module.exports = {
    uploadLecture,
    uploadThumbnail,
    uploadAvatar
}


// if (lecturePath) {
    //     try {
    //         const cloudinaryResponse = await cloudinary.uploader.upload(lecturePath, {
    //             resource_type: 'video',
    //         });
    //         public_id = cloudinaryResponse.public_id;
    //         secure_url = cloudinaryResponse.secure_url;

    //         console.log('Cloudinary Upload Success:', public_id, secure_url);
    //     } catch (error) {
    //         console.error('Error uploading to Cloudinary:', error);
    //         throw new Error('Failed to upload video');
    //     }
    // }