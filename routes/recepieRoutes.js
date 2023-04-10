const express = require("express")
const { getAllRecepies, createRecepie, updateRecepie, deleteRecepie } = require("../controlers/recepieControler")
const { login_check_middleware, ownershipMiddleware } = require("../middlewares/authMiddleware")
const { recepieSchema, fieldValidationMiddleware } = require("../middlewares/fieldValidationMiddleware")
const imageMiddleware = require("../middlewares/imageMiddleware")
const router = express.Router()



router.get("/", getAllRecepies)
router.post("/", imageMiddleware, recepieSchema, fieldValidationMiddleware, createRecepie)
router.put("/:userId/:recepieId", imageMiddleware, updateRecepie)
router.delete("/:userId/:recepieId", deleteRecepie)

module.exports = router