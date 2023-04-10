const express = require("express");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload")
require("dotenv").config();


const db = require("./models/index")
const errorHandler = require("./helpers/errorHandler")
const indexRouter = require("./routes")


if (process.env.NODE_ENV === "porduction") {

    //production variables
}
const port = process.env.DEV_PORT || 3030;
const app = express();

//middlewares to config app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: './uploads'
}));

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


            //if the conection with the db is successfull
            app.listen(port, () => {
                console.log(`Conected to the database, Servidor funcionando en el puerto ${port}`);

            });

        })
        .catch(err => {
            console.log("cant conect to the database " + err)
        })

}

conection_db_server()








module.exports = app;
