const fsExtra = require("fs-extra")
const { uploadImage, deleteImage } = require("../helpers/imageUploadConfig")
const Recepie = require("../models/Recepies")


//response service object 
const serviceResponse = {
    error: false,
    code: 0,
    message: "",
    data: {} || []
}


//create recepie service
async function createRecepieService(req) {

    const { tempFilePath } = req.files.image

    try {

        //uploading image to cloudinary db
        const image = await uploadImage(tempFilePath)

        //atatach image url and id to body and upload recepie data to mongo atlas

        req.body.image = { url: image.secure_url, id: image.public_id }

        const recepie = await Recepie.create(req.body)

        serviceResponse.error = false
        serviceResponse.message = `recepie created`
        serviceResponse.data = recepie

        return serviceResponse




    }
    catch (err) {


        //delete image from uploads file
        await fsExtra.unlink(filepath)

        serviceResponse.error = true
        serviceResponse.message = "cant create recepie"
        serviceResponse.code = 500


        return serviceResponse


    }

}


//get all recepies service

async function getAllRecepieService() {

    try {
        const recepies = await Recepie.find()


        serviceResponse.error = false
        serviceResponse.message = `there are ${recepies.length} recepies`
        serviceResponse.data = recepies

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
        const { userId, recepieId } = req.params

        if (req.files) {

            //search for recepie

            const recepie = await Recepie.findOne({ recepieId })
            //validate user
            if (recepie.userId !== req.user.id) {
                serviceResponse.error = true
                serviceResponse.message = "not your recepie"
                serviceResponse.code = 402
                return serviceResponse

            }

            //delete and then upload new image
            const { image } = recepie
            const { tempFilePath } = req.files.image

            await deleteImage(image.id)
            const newImage = await uploadImage(tempFilePath)

            //add new image info to body object and added to the recepie db
            req.body.image = { url: newImage.secure_url, id: newImage.public_id }

            const newRecepie = await Recepie.findOneAndUpdate({ userId }, req.body, { new: true })

            serviceResponse.error = false
            serviceResponse.message = `recepie updated`
            serviceResponse.data = newRecepie

            return serviceResponse

        }
        else {

            //Just adding body without image

            const newRecepie = await Recepie.findOneAndUpdate({ userId }, req.body, { new: true })

            serviceResponse.error = false
            serviceResponse.message = `recepie updated`
            serviceResponse.data = newRecepie

            return serviceResponse

        }


    }
    catch (err) {

        serviceResponse.error = true
        serviceResponse.message = `cant update recepie, error: ${err}`
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