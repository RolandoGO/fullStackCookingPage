const jwt = require("jsonwebtoken")
require("dotenv").config();

//function for encoding with jwt the data pass in and if no expire string if giving, it will be 5 hours by default
function createToken(payload, expiresIn = "5h") {


    const options = {
        expiresIn
    };
    const encodeData = jwt.sign(payload, process.env.JWT_SECRET_WORD, options);

    return encodeData

}

//decode jwt string function
function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);
        return decoded;
    } catch (err) {

        return null;
    }
}

module.exports = {
    createToken,
    decodeToken
}