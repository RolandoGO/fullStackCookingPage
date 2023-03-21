const express = require("express")
const userRoutes = require("./userRoutes")
const recepieRoutes = require("./recepieRoutes")
const authRoutes = require("./authRoutes")

const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("in main page")
})

//Router for every entity
router.use("/users", userRoutes)


module.exports = router