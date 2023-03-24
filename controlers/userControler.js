const User = require("../models/Users")
const successResponse = require("../helpers/successResponse")
const ErrorHandler = require("../helpers/errorHandler")


const userController = {

    getAllUsers: async (req, res, next) => {

        console.group(req.user)
        try {
            const user = await User.find().select("name email")

            const response = {
                res,
                message: `there are ${user.length} users`,
                body: user
            }

            successResponse(response)
        }
        catch (err) {
            const error = new ErrorHandler(`cant create user becouse: ${err}`, 400)
            next(error)
        }


    },

    createUser: async (req, res, next) => {

        try {
            const user = await User.create(req.body)

            const response = {
                res,
                body: user
            }

            successResponse(response)
        }
        catch (err) {
            const error = new ErrorHandler(`cant create user becouse: ${err}`, 400)
            next(error)
        }


    },

    updateUser: async (req, res, next) => {

        try {
            const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body)

            const response = {
                res,
                message: "user updated",
                body: user
            }

            successResponse(response)
        }
        catch (err) {
            const error = new ErrorHandler(`cant create user becouse: ${err}`, 400)
            next(error)
        }


    },


    deleteUser: async (req, res, next) => {

        try {
            const user = await User.deleteOne({ _id: req.params.id })
            const response = {
                res,
                message: "user deleted",
                body: user
            }

            successResponse(response)
        }
        catch (err) {
            const error = new ErrorHandler(`cant delete user becouse: ${err}`, 400)
            next(error)
        }


    }
}

module.exports = userController



