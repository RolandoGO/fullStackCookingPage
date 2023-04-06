const ErrorHandler = require("../helpers/errorHandler")
const successResponse = require("../helpers/successResponse")
const { createRecepieService } = require("../service/recepieService")

const recepieControler = {

    getAllRecepies: () => {

    },

    createRecepie: async (req, res, next) => {


        const serviceCall = await createRecepieService(req)

        if (!serviceCall.error) {

            const response = {
                res,
                message: "recepie created",
                body: serviceCall.message
            }

            successResponse(response)
        }
        else {
            const error = new ErrorHandler(`cant create recepie: ${serviceCall.message}`, serviceCall.code)
            next(error)
        }
    },

    updateRecepie: () => {

    },

    deleteRecepie: () => {

    }

}

module.exports = recepieControler