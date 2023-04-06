const ErrorHandler = require("../helpers/errorHandler")
const uploadImage = require("../helpers/imageUploadConfig")
const successResponse = require("../helpers/successResponse")

const recepieControler = {

    getAllRecepies: () => {

    },

    createRecepie: async (req, res, next) => {

        const { tempFilePath } = req.files.image

        try {
            await uploadImage(tempFilePath)
            res.send("image uploaded ")
        }
        catch (err) {

            res.send(`error: ${err}`)


        }
    },

    updateRecepie: () => {

    },

    deleteRecepie: () => {

    }

}

module.exports = recepieControler