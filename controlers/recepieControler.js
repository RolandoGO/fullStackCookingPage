const Recepie = require("../models/Recepies")
const ErrorHandler = require("../helpers/errorHandler")
const successResponse = require("../helpers/successResponse")

const recepieControler = {

    getAllRecepies: () => {

    },

    getOneRecepie: () => {

    },

    createRecepie: async (req, res, next) => {

        if (typeof req.body === typeof []) {
            try {
                await Recepie.insertMany(req.body)
                successResponse({
                    res,
                    message: "recepies created"
                })

            }
            catch {

                const error = new ErrorHandler("cant create recepies", 500)
                next(error)
                return
            }
        }
        else {
            try {
                await Recepie.create(req.body)
                successResponse({
                    res,
                    message: "recepie created"
                })

            }
            catch {

                const error = new ErrorHandler("cant create recepie", 500)
                next(error)
                return
            }

        }



    },

    updateRecepie: () => {

    },

    deleteRecepie: () => {

    }

}

module.exports = recepieControler