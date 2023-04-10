const ErrorHandler = require("../helpers/errorHandler")
const successResponse = require("../helpers/successResponse")
const { createRecepieService, getAllRecepieService, updateRecepieService } = require("../service/recepieService")


const recepieControler = {

    getAllRecepies: async (req, res, next) => {



        const serviceCall = await getAllRecepieService(req)

        if (!serviceCall.error) {

            const response = {
                res,
                message: serviceCall.message,
                body: serviceCall.data
            }

            successResponse(response)
        }
        else {

            const error = new ErrorHandler(serviceCall.message, serviceCall.code)
            next(error)

        }



    },

    createRecepie: async (req, res, next) => {


        const serviceCall = await createRecepieService(req)

        if (!serviceCall.error) {

            const response = {
                res,
                message: serviceCall.message,
                body: serviceCall.data
            }

            successResponse(response)
        }
        else {
            const error = new ErrorHandler(serviceCall.message, serviceCall.code)
            next(error)
        }
    },

    updateRecepie: async (req, res, next) => {

        const serviceCall = await updateRecepieService(req)

        if (!serviceCall.error) {

            const response = {
                res,
                message: serviceCall.message,
                body: serviceCall.data
            }

            successResponse(response)
        }
        else {
            const error = new ErrorHandler(serviceCall.message, serviceCall.code)
            next(error)
        }
    },


    deleteRecepie: () => {

    }

}

module.exports = recepieControler