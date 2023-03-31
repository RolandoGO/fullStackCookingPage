const express = require("express")
const { logInUser, logOutUser, forgotPassword, resetPasswordPage, resetPassword } = require("../controlers/authControler")
const { loginSchema, emailSchema, newPasswordSchema, fieldValidationMiddleware } = require("../middlewares/fieldValidationMiddleware")
const { login_check_middleware, ownershipMiddleware } = require("../middlewares/authMiddleware")
const router = express.Router()

router.post("/login", loginSchema, fieldValidationMiddleware, logInUser)
router.post("/logout/:userId", login_check_middleware, ownershipMiddleware, logOutUser)

router.post("/forgotpassword", emailSchema, fieldValidationMiddleware, forgotPassword)
router.get("/resetpassword/:token", resetPasswordPage)
router.post("/resetpassword/:token", newPasswordSchema, fieldValidationMiddleware, resetPassword)


module.exports = router