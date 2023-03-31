const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const deletedUsers = require("./DeleteUsers")
const errorHandler = require("../helpers/errorHandler")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [3, "name must have more than 3 characters"],
        maxlength: [20, "name cant have more than 20 characters"],
        required: true
    },

    email: {
        type: String,
        required: true,
        validate: [function (email) {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email)
        }, "not a valid email adress"],
        unique: [true, "email already exist"]
    },
    role: {
        type: String,
        enum: ["client"],
        default: "client"
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    confirmAcountToken: {
        type: String
    },

    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String

    },


    createdAt: {
        type: Date,
        default: Date.now
    }
});



//query middleware for passing the deleted document to the deletedUser collection, for saving the data that is erraise.

userSchema.pre("deleteOne", async function (next) {


    try {
        const document = await this.model.findOne(this.getQuery());
        const { name, email, password, role, createdAt } = document

        deletedUsers.create({
            name,
            email,
            password,
            role,
            createdAt
        })

        next()
    }
    catch {
        const error = new errorHandler("cant soft delete the user", 500)
        next(error)

    }


})

// document middleware for hashing the password before saving it

userSchema.pre("save", async function (next) {


    try {
        const hashPassword = await bcrypt.hash(this.password, 10)
        this.password = hashPassword

        next()
    }
    catch (err) {

        const error = new errorHandler(err, 500)
        next(error)

    }


})

const User = mongoose.model('User', userSchema);

module.exports = User;