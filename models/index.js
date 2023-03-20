const mongoose = require('mongoose');
require("dotenv").config()


function db_conection() {

    // Connect to MongoDB cloud
    return mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

}

module.exports = db_conection