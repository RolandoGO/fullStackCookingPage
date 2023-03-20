const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();


const db = require("./models/index")
const errorHandler = require("./helpers/herrorHandler")
const indexRouter = require("./routes")



const port = process.env.PORT || 3030;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ROUTES
app.use("/", indexRouter)


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new errorHandler("not found", 404)
    next(error)
});

// error handler
app.use((err, req, res, next) => {

    res.status(err.statusCode || 500).json({ error: err.message || "server error" })
});

// function for conecting to database and conecting to the server


function conection_db_server() {

    db()
        .then(msg => {

            console.log("conected to the database")
            //if the conection with the db is successfull
            app.listen(port, () => {
                console.log(`Servidor funcionando en el puerto ${port}`);

            });

        })
        .catch(err => {
            console.log("cant conect to the database " + err)
        })

}

conection_db_server()








module.exports = app;
