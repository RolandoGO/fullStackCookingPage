const express = require("express")
const userRoutes = require("./userRoutes")
const recepieRoutes = require("./recepieRoutes")
const authRoutes = require("./authRoutes")
const multer = require('multer');


const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("in main page")
})

//Router for every entity
router.use("/users", userRoutes)
router.use("/recepies", recepieRoutes)
router.use("/auth", authRoutes)




module.exports = router