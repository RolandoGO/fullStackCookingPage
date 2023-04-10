const cloudinary = require('cloudinary').v2;
const fsExtra = require("fs-extra")
require("dotenv").config()

// Cloudinary Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


//upload image function to cloudinary db
async function uploadImage(filepath) {

    const imageUpload = await cloudinary.uploader.upload(filepath, { folder: "recepies", type: "private" })


    //delete image from uploads file
    await fsExtra.unlink(filepath)

    return imageUpload
}


async function deleteImage(imageId) {

    const imageDelete = await cloudinary.uploader.destroy(imageId)

}

module.exports = { uploadImage, deleteImage }