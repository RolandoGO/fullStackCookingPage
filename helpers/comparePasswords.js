const bcrypt = require("bcrypt")

//function for comparing hash password and regular password 
async function decodePassword(password, hashPassword) {


    try {
        const comparePassword = await bcrypt.compare(password, hashPassword)

        return comparePassword


    }
    catch {

        throw new Error("error in the password decode function")
    }

}

module.exports = decodePassword