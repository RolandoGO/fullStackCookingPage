const jwt = require("jsonwebtoken")
require("dotenv").config();


function createToken(payload, expiresIn = "5h") {


    const options = {
        expiresIn
    };
    const encodeData = jwt.sign(payload, process.env.JWT_SECRET_WORD, options);

    return encodeData

}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);
        return decoded

    } catch (err) {
        return null
    }
}

function decodeToken(token) {
    try {
        const decoded = jwt.decode(token);
        return decoded

    } catch (err) {
        return null
    }
}

module.exports = {
    createToken,
    verifyToken,
    decodeToken
}