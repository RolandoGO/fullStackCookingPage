const express = require("express")
const { getAllRecepies, getOneRecepie, createRecepie, updateRecepie, deleteRecepie } = require("../controlers/recepieControler")
const router = express.Router()

router.get("/", getAllRecepies)
router.get("/:id", getOneRecepie)
router.post("/", createRecepie)
router.put("/:id", updateRecepie)
router.delete("/:id", deleteRecepie)

module.exports = router