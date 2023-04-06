const uploadImage = require("../helpers/imageUploadConfig")
const Recepie = require("../models/Recepies")


//response service object 
const serviceResponse = {
    error: false,
    message: "",
    code: 0
}

//create recepie service
async function createRecepieService(req) {

    try {

        //uploading image to cloudinary db
        const { tempFilePath } = req.files.image
        const image = await uploadImage(tempFilePath)

        //atatach image url and id to body and upload recepie data to mongo atlas

        req.body.image = { url: image.secure_url, id: image.public_id }

        const recepie = await Recepie.create(req.body)

        serviceResponse.error = false
        serviceResponse.message = recepie
        return serviceResponse


    }
    catch (err) {
        serviceResponse.error = true
        serviceResponse.message = `cant created recepie, error: ${err}`
        serviceResponse.code = 500
        return serviceResponse


    }

}


//get all recepies service

async function getAllRecepieService() {

    try {
        await Recepie.find()
        serviceResponse.error = false

        return serviceResponse

    }
    catch {
        serviceResponse.error = true
        serviceResponse.message = "cant get recepies"
        serviceResponse.code = 500
        return serviceResponse
    }

}

//update recepie service
async function updateRecepieService(req) {

    try {
        await Recepie.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        serviceResponse.error = false

        return serviceResponse

    }
    catch {
        serviceResponse.error = true
        serviceResponse.message = "cant update recepie"
        serviceResponse.code = 500
        return serviceResponse
    }

}

//delete recepie service

async function deleteRecepieService(req) {

    try {
        await Recepie.deleteOne({ _id: req.params.id })
        serviceResponse.error = false

        return serviceResponse

    }
    catch {
        serviceResponse.error = true
        serviceResponse.message = "cant delete recepie"
        serviceResponse.code = 500
        return serviceResponse
    }

}




module.exports = {

    createRecepieService,
    getAllRecepieService,
    updateRecepieService,
    deleteRecepieService

}