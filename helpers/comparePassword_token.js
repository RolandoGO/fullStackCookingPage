const bcrypt = require("bcrypt")

async function comparingPassword_Token(password, hashPassword) {


    try {
        const comparePassword = await bcrypt.compare(password, hashPassword)

        return comparePassword


    }
    catch {

        throw new Error("error in the password decode function")
    }

}

module.exports = comparingPassword_Token