const express = require("express")
const { emailSchema, singUpSchema, fieldValidationMiddleware } = require("../middlewares/fieldValidationMiddleware")
const { login_check_middleware, ownershipMiddleware } = require("../middlewares/authMiddleware")
const { createUserPage, createUser, deleteUser, getAllUsers, updateUser, userConfirmAcount } = require("../controlers/userControler")
const router = express.Router()

router.get("/", login_check_middleware, ownershipMiddleware, getAllUsers)

router.post("/confirmacount", emailSchema, fieldValidationMiddleware, userConfirmAcount)

router.get("/singup/:token", createUserPage)
router.post("/singup/:token", singUpSchema, fieldValidationMiddleware, createUser)

router.put("/:userId", login_check_middleware, ownershipMiddleware, updateUser)
router.delete("/:userId", login_check_middleware, ownershipMiddleware, deleteUser)

module.exports = router