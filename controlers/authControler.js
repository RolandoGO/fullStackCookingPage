const User = require("../models/user")
const bcrypt = require("bcrypt")
const comparingPassword_Token = require("../helpers/comparePassword_token")
const { createToken, verifyToken, decodeToken } = require("../helpers/jwt")
const ErrorHandler = require("../helpers/errorHandler")
const successResponse = require("../helpers/successResponse")
const sendEmailFunction = require("../helpers/sendEmailFunc")
const prepareEmailTemplate = require("../helpers/resetPasswordEmailTemplate")
require("dotenv").config();



const authController = {


    logInUser: async (req, res, next) => {

        const { email, password } = req.body
        try {

            //find user in db
            const user = await User.findOne({ email })

            if (!user) {
                const error = new ErrorHandler(`cant login user, invalid email`, 401)
                next(error)
                return
            }



            //compare passwords

            const comparePassword = await comparingPassword_Token(password, user.password)


            if (comparePassword) {
                //set the isLogin field in the db as true

                try {
                    await User.findOneAndUpdate({ email: user.email }, { isLogin: true }, { new: true })

                }
                catch {

                    return
                }

                //create token and send in it in body
                const dataToEncode = {
                    name: user.name,
                    email: user.email,
                    id: user._id
                }
                const token = createToken(dataToEncode)

                const response = {
                    res,
                    message: "user login success",
                    body: { token }

                }

                successResponse(response)

            }
            else {
                const error = new ErrorHandler(`invalid password`, 401)
                next(error)

            }



        }
        catch (err) {
            const error = new ErrorHandler(`cant login user, ${err}`, 401)
            next(error)
        }

    },


    forgotPassword: async (req, res, next) => {

        try {
            //check email in db
            const { email } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                const error = new ErrorHandler(` invalid email`, 401)
                next(error)
                return
            }

            //create token saving it in the database

            const token = createToken({ email }, "10m");
            const hashToken = await bcrypt.hash(token, 10)


            await User.findOneAndUpdate({ email }, { resetPasswordToken: hashToken }, { new: true })

            //send url with token to email adress

            const resetPasswordUrl = `${req.protocol}://${req.get("host")}/auth/resetPassword/${token}`
            const emailTemplateData = {
                email,
                info: "email token valid for 10 min",
                url: resetPasswordUrl
            }

            const emailOptions = {
                email,
                subject: "reset password email",
                html: prepareEmailTemplate(emailTemplateData)

            }

            await sendEmailFunction(emailOptions)

            const response = {
                res,
                message: "token send to email"
            }
            successResponse(response)

        }

        catch (err) {

            await User.findOneAndUpdate({ email: req.email }, { resetPasswordToken: undefined }, { new: true })
            const error = new ErrorHandler(`error reseting password: ${err}`, 500)
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

        try {
            const { email } = decodeToken(req.params.token)
            const { password } = req.body

            //check if user exist
            const user = await User.findOne({ email })
            if (!user) {
                const error = new ErrorHandler("user not found, wrong email", 400)
                next(error)
                return
            }

            //check if token in url is the same that the one in db
            const { token } = req.params
            const comparingTokens = await comparingPassword_Token(token, user.resetPasswordToken)
            if (!comparingTokens) {
                const error = new ErrorHandler("invalid token", 401)
                next(error)
                return
            }

            //reseting the password
            user.password = password
            user.resetPasswordToken = undefined
            await user.save()

            const response = {
                res,
                message: "password reset successfully"

            }

            successResponse(response)



        }
        catch {
            const error = new ErrorHandler("cant reset password", 500)
            next(error)
        }





    }
}

module.exports = authController