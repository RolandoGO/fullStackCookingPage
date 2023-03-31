const User = require("../models/Users")
const { verifyToken } = require("../helpers/jwt")
const ErrorHandler = require("../helpers/errorHandler")
const successResponse = require("../helpers/successResponse")
const { logInService, forgotPasswordService, resetPasswordService } = require("../service/authService")
require("dotenv").config();



const authController = {

    //login Controler
    logInUser: async (req, res, next) => {

        const serviceCall = await logInService(req)

        if (!serviceCall.error) {

            const response = {
                res,
                message: "user login success",
                body: { token: serviceCall.message }

            }

            successResponse(response)

        }
        else {
            const error = new ErrorHandler(`cant login user: ${serviceCall.message}`, serviceCall.code)
            next(error)
        }

    },
    //logOut Controler
    logOutUser: async (req, res, next) => {


        const { email } = req.user
        try {

            await User.findOneAndUpdate({ email }, { isLogin: false }, { new: true })
            const response = {
                res,
                message: "user logout"

            }

            successResponse(response)


        }
        catch (err) {
            const error = new ErrorHandler(`cant logout user: ${err}`, 500)
            next(error)
        }


    },

    //functionality for sending email with token 
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
            const error = new ErrorHandler(serviceCall.message, serviceCall.code)
            next(error)

        }

    },

    //functionality for rendering page with url and token from email 

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

    //functionality to reset password 

    resetPassword: async (req, res, next) => {

        const serviceCall = await resetPasswordService(req)

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