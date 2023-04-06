const cloudinary = require('cloudinary').v2;
const fsExtra = require("fs-extra")
require("dotenv").config()

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//upload image function to cloudinary db
async function uploadImage(filepath) {

    const imageUpload = await cloudinary.uploader.upload(filepath, { folder: "recepies" })

    //delete image from uploads file
    await fsExtra.unlink(filepath)

    return imageUpload


}

module.exports = uploadImage