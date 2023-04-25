const mongoose = require('mongoose');
require("dotenv").config()


async function db_conection() {

    if (process.env.NODE_ENV === "production") {

        // Connect to MongoDB cloud
        const mongooConection = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return mongooConection
    }
    else {

        // Connect to MongoDB test db
        const mongooConection = await mongoose.connect(process.env.TEST_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return mongooConection

    }



}

module.exports = db_conection