const User = require("../models/user")
const bcrypt = require("bcrypt")
const comparingPassword_Token = require("../helpers/comparePassword_token")
const { createToken, decodeToken } = require("../helpers/jwt")
const sendEmailFunction = require("../helpers/sendEmailFunc")
const prepareEmailTemplate = require("../helpers/resetPasswordEmailTemplate")
require("dotenv").config();


//general object to return for controler response
const serviceResponse = {
    error,
    message,
    code
}

async function logInService(req) {

    const { email, password } = req.body
    try {

        //find user in db
        const user = await User.findOne({ email })

        if (!user) {
            serviceResponse.error = true
            serviceResponse.message = "no user found"
            serviceResponse.code = 401
            return serviceResponse

        }


        //compare passwords

        const comparePassword = await comparingPassword_Token(password, user.password)


        if (comparePassword) {
            //set the isLogin field in the db as true

            try {
                await User.findOneAndUpdate({ email: user.email }, { isLogin: true }, { new: true })

            }
            catch {

                serviceResponse.error = true
                serviceResponse.message = "cant update login field"
                serviceResponse.code = 500

                return serviceResponse
            }

            //create token and send in it in body
            const dataToEncode = {
                email: user.email,
                id: user._id
            }

            const token = createToken(dataToEncode)

            serviceResponse.error = false
            serviceResponse.message = token


            return serviceResponse


        }
        else {
            serviceResponse.error = true
            serviceResponse.message = "wrong password"
            serviceResponse.code = 401

            return serviceResponse

        }
    }
    catch (err) {
        serviceResponse.error = true
        serviceResponse.message = "something went wrong in the login"
        serviceResponse.code = 500

        return serviceResponse
    }
}

//forgot password service

async function forgotPasswordService(req) {

    try {
        //check email in db
        const { email } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            serviceResponse.error = true
            serviceResponse.message = "invalid email"
            serviceResponse.code = 401
            return serviceResponse
        }

        //create token saving it in the database

        const token = createToken({ email }, "10m");

        try {
            const hashToken = await bcrypt.hash(token, 10)

            const savingHashEmailToken = await User.findOneAndUpdate({ email }, { resetPasswordToken: hashToken }, { new: true })

            if (!savingHashEmailToken) {
                serviceResponse.error = true
                serviceResponse.message = "cant save hash token in db"
                serviceResponse.code = 500
                return serviceResponse

            }

        }
        catch {
            serviceResponse.error = true
            serviceResponse.message = "cant save hash token in db"
            serviceResponse.code = 500
            return serviceResponse

        }



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

        serviceResponse.error = false

        return serviceResponse

    }
    catch {
        serviceResponse.error = true
        serviceResponse.message = "cant performe the task for now"
        serviceResponse.code = 500
        return serviceResponse

    }
}

//reset password service
async function resetPasswordService(req) {


    try {
        const { email } = decodeToken(req.params.token)
        const { password } = req.body

        //check if user exist
        const user = await User.findOne({ email })
        if (!user) {
            serviceResponse.error = true
            serviceResponse.message = "user not found, invalid email"
            serviceResponse.code = 401
            return serviceResponse
        }

        //check if token in url is the same that the one in db
        const { token } = req.params
        const comparingTokens = await comparingPassword_Token(token, user.resetPasswordToken)
        if (!comparingTokens) {
            serviceResponse.error = true
            serviceResponse.message = "invalid token"
            serviceResponse.code = 401
            return serviceResponse
        }

        //reseting the password
        user.password = password
        user.resetPasswordToken = undefined
        await user.save()

        serviceResponse.error = false
        return serviceResponse
    }
    catch {
        serviceResponse.error = true
        serviceResponse.message = "cant reset the password for now"
        serviceResponse.code = 500
        return serviceResponse

    }
}



module.exports = {
    logInService,
    forgotPasswordService,
    resetPasswordService
}