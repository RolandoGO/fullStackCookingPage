const User = require("../models/Users")
const { decodeToken, verifyToken } = require("../helpers/jwt")
const errorResponse = require("../helpers/errorHandler")


//checking if the token is valid and the user is login in the db


async function login_check_middleware(req, res, next) {


    //finding token in headers

    const token_in_header = req.headers["authorization"]


    if (!token_in_header) {
        const err = new errorResponse("no token found", 401)
        next(err)
        return

    }
    //check if token is valid
    const tokenVerifycation = verifyToken(token_in_header)

    if (!tokenVerifycation) {
        const err = new errorResponse("invalid token", 401)
        next(err)
        return
    }

    const tokenData = decodeToken(token_in_header)
    try {
        //checking if the user exist in the db
        const user = await User.findOne({ email: tokenData.email })
        if (!user) {
            const err = new errorResponse("user not found", 400)
            next(err)
            return
        }
        //checking if user field "isLogin" is true
        if (user.isLogin === false) {
            const err = new errorResponse("user not Login", 401)
            next(err)
            return
        }
        //if user token is valid, is in the db and the field isLogin is true pass to the next middleware and attach the user data in req

        req.user = {
            email: user.email,
            id: user._id.toString()
        }
        next()



    }
    catch (err) {
        const error = new errorResponse(`cant check token, something happend ${err}`, 500)
        next(error)
        return

    }


}



//middleware for checking if the login user is authorize for what he/she want to do

async function ownershipMiddleware(req, res, next) {



    //checking if user is admin by the admin email in .env

    const { email, id } = req.user

    const user = await User.findOne({ email })

    if (user.role.toLowerCase() === "admin") {
        next()
        return
    }


    //checking if USER ids are the same when is not admin role

    else if (req.params.userId === id) {
        next()
        return
    }
    else {
        const error = new errorResponse("not authorize", 401)
        next(error)
        return

    }




}

module.exports = {
    login_check_middleware,
    ownershipMiddleware

}