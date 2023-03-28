const User = require("../models/user")
const { verifyToken } = require("../helpers/jwt")
const ErrorHandler = require("../helpers/errorHandler")
const successResponse = require("../helpers/successResponse")
const { logInService, forgotPasswordService, resetPasswordService } = require("../service/authService")
require("dotenv").config();



const authController = {


    logInUser: async (req, res, next) => {

        const serviceCall = await logInService(req)

        if (!serviceCall.error) {

            const response = {
                res,
                message: "user login success",
                body: { token }

            }

            successResponse(response)

        }
        else {
            const error = new ErrorHandler(`cant login user: ${serviceCall.message}`, serviceCall.code)
            next(error)
        }

    },


    forgotPassword: async (req, res, next) => {

        const serviceCall = await forgotPasswordService(req)

        if (!serviceCall.error) {

            const response = {
                res,
                message: "token send to email"
            }
            successResponse(response)
        }

        else {

            await User.findOneAndUpdate({ email: req.email }, { resetPasswordToken: undefined }, { new: true })
            const error = new ErrorHandler(`cant login user: ${serviceCall.message}`, serviceCall.code)
            next(error)

        }

    },


    resetPasswordPage: async (req, res, next) => {

        // verify if the token is valid and hasent expire
        const { token } = req.params
        const tokenVerification = verifyToken(token)

        if (!tokenVerification) {
            const error = new ErrorHandler("EXPIRE TOKEN", 401)
            next(error)
            return
        }

        res.render("resetPasswordPage")
    },

    resetPassword: async (req, res, next) => {

        const serviceCall = resetPasswordService(req)

        if (!serviceCall.error) {


            const response = {
                res,
                message: "password reset successfully"

            }

            successResponse(response)



        }
        else {
            const error = new ErrorHandler(serviceCall.message, serviceCall.code)
            next(error)
        }





    }
}

module.exports = authController