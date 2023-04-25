const express = require("express");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload")
require("dotenv").config();

const db = require("./models/index")
const errorHandler = require("./helpers/errorHandler")
const indexRouter = require("./routes")

const port = process.env.PORT || 3030;


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

db()
    .then(() => {
        console.log("conected to db")
        return
    })
    .catch((err) => { throw Error(`cant connect to db, ${err}`) })



app.listen(port)
console.log("server running")


module.exports = { app, port }
