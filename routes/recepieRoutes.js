const express = require("express")
const { getAllRecepies, createRecepie, updateRecepie, deleteRecepie } = require("../controlers/recepieControler")
const router = express.Router()

router.get("/", getAllRecepies)
router.post("/", createRecepie)
router.put("/:userId/:recepieId", updateRecepie)
router.delete("/:userId/:recepieId", deleteRecepie)

module.exports = router