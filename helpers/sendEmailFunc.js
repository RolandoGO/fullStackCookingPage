const nodemailer = require("nodemailer")
require("dotenv").config()


//send email function for reseting the password
async function sendEmailFunction(options) {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: "<rolandogrethe@gmail.com>",
        to: options.email,
        subject: options.subject,
        html: options.html

    }

    await transport.sendMail(mailOptions)
}


module.exports = sendEmailFunction
