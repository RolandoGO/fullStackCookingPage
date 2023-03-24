const User = require("../models/user")
const comparingPassword_Token = require("../helpers/decryptFunc")
const { createToken } = require("../helpers/jwt")

const ErrorHandler = require("../helpers/errorHandler")
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
                const error = new ErrorHandler(`cant login user`, 401)
                next(error)

            }



        }
        catch (err) {
            const error = new ErrorHandler(`cant login user, ${err}`, 401)
            next(error)
        }

    }
}

module.exports = authController