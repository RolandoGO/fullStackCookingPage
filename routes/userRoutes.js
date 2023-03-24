const express = require("express")
const { singUpSchema, fieldValidationMiddleware } = require("../middlewares/fieldsValidation")
const { login_check_middleware, ownershipMiddleware } = require("../middlewares/authMiddlewares")
const { createUser, deleteUser, getAllUsers, updateUser } = require("../controlers/userControler")
const router = express.Router()

router.get("/", login_check_middleware, ownershipMiddleware, getAllUsers)
router.post("/singup", singUpSchema, fieldValidationMiddleware, createUser)
router.put("/:id", login_check_middleware, ownershipMiddleware, updateUser)
router.delete("/:id", login_check_middleware, ownershipMiddleware, deleteUser)

module.exports = router