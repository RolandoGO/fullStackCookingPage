
const User = require("../models/Users")
const { createToken } = require("../helpers/jwt")
const prepareEmailTemplate = require("../helpers/welcomeEmailTemplate")
const sendEmailFunction = require("../helpers/sendEmailFunc")


const serviceResponse = {
    error: false,
    message: "",
    code: 0
}

async function confirmAcountService(req) {

    const { email } = req.body

    //create token 

    const token = createToken({ email }, "10m");

    //send url with token to email adress

    const confirmAcountUrl = `${req.protocol}://${req.get("host")}/users/singup/${token}`
    const emailTemplateData = {
        email,
        url: confirmAcountUrl
    }

    const emailOptions = {
        email,
        subject: "confirm acount email",
        html: prepareEmailTemplate(emailTemplateData)

    }

    try {
        await sendEmailFunction(emailOptions)

        serviceResponse.error = false

        return serviceResponse

    }



    catch (err) {
        serviceResponse.error = true
        serviceResponse.message = `cant send email to confirm acout ${err}`
        serviceResponse.code = 500
        return serviceResponse

    }



}

module.exports = {
    confirmAcountService
}