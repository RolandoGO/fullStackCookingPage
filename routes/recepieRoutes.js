const express = require("express")
const { getAllRecepies, createRecepie, updateRecepie, deleteRecepie } = require("../controlers/recepieControler")
const { login_check_middleware, ownershipMiddleware } = require("../middlewares/authMiddleware")
const router = express.Router()

router.get("/", login_check_middleware, getAllRecepies)
router.post("/", login_check_middleware, createRecepie)
router.put("/:userId/:recepieId", login_check_middleware, ownershipMiddleware, updateRecepie)
router.delete("/:userId/:recepieId", login_check_middleware, ownershipMiddleware, deleteRecepie)

module.exports = router