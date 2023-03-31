const User = require("../models/Users")
const successResponse = require("../helpers/successResponse")
const ErrorHandler = require("../helpers/errorHandler")

const { confirmAcountService } = require("../service/userService")
const { verifyToken, decodeToken } = require("../helpers/jwt")


const userController = {

    getAllUsers: async (req, res, next) => {

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

    //Controler that use service to corroborate the email addres by sending one

    userConfirmAcount: async (req, res, next) => {

        const serviceCall = await confirmAcountService(req)

        if (!serviceCall.error) {
            const response = {
                res,
                message: "email send"

            }

            successResponse(response)

        }
        else {
            const error = new ErrorHandler(serviceCall.message, serviceCall.code)
            next(error)

        }
    },

    //render page for post req to create user

    createUserPage: (req, res, next) => {

        // verify if the token is valid and hasent expire
        const { token } = req.params
        const tokenVerification = verifyToken(token)

        if (!tokenVerification) {
            const error = new ErrorHandler("INVALID TOKEN", 401)
            next(error)
            return
        }

        res.render("createUserPage")

    },

    //create user controler
    createUser: async (req, res, next) => {

        const { name, password } = req.body
        const { email } = decodeToken(req.params.token)

        const userData = {

            name,
            email,
            password

        }

        try {
            const user = await User.create(userData)

            const response = {
                res,
                message: "user created"
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
            const error = new ErrorHandler(`cant update user becouse: ${err}`, 400)
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



