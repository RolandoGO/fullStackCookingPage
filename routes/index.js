const express = require("express")
const router = express.Router()


router.get("/", (req, res, next) => {
    res.send("in main page")
})

//Router for every entity
// router.use("/users", userRoutes)
// router.use("/recepies", recepieRoutes)

module.exports = router