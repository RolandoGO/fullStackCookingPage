const express = require("express")
const { singUpSchema, fieldValidationMiddleware } = require("../middlewares/fieldValidationMiddleware")
const { login_check_middleware, ownershipMiddleware } = require("../middlewares/authMiddleware")
const { createUser, deleteUser, getAllUsers, updateUser } = require("../controlers/userControler")
const router = express.Router()

router.get("/", login_check_middleware, ownershipMiddleware, getAllUsers)
router.post("/singup", singUpSchema, fieldValidationMiddleware, createUser)
router.put("/:userId", login_check_middleware, ownershipMiddleware, updateUser)
router.delete("/:userId", login_check_middleware, ownershipMiddleware, deleteUser)

module.exports = router