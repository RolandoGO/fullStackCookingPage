const { checkSchema, validationResult } = require('express-validator');


//schemas for middleware to use in validation

const singUpSchema = checkSchema({
    name: {
        notEmpty: true,
        errorMessage: "Name field cannot be empty"
    },
    email: {
        notEmpty: true,
        errorMessage: "email field cannot be empty",
        isEmail: {
            bail: true,
        }
    },
    password: {
        isLength: {
            errorMessage: 'Password should be at least 5 chars long',
            options: { min: 5 },
        }

    }
})


//schema for auth validation route
const loginSchema = checkSchema({

    email: {


        isEmail: {
            bail: true,
            errorMessage: "email is require, example: xxxx@gmail.com"
        }
    },
    password: {
        notEmpty: true,
        isLength: {
            errorMessage: 'Password should be at least 5 chars long',
            options: { min: 5 },
        }

    }

})
// schema for forgot password route
const emailSchema = checkSchema({

    email: {


        isEmail: {
            bail: true,
            errorMessage: "email is require, example: xxxx@gmail.com"
        }
    }

})



//middleware for checking fields working with the schema.
const fieldValidationMiddleware = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}



module.exports = {

    singUpSchema,
    loginSchema,
    emailSchema,
    fieldValidationMiddleware


}