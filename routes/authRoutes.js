const express = require("express")
const { logInUser, forgotPassword, resetPasswordPage, resetPassword } = require("../controlers/authControler")
const { loginSchema, emailSchema, newPasswordSchema, fieldValidationMiddleware } = require("../middlewares/fieldValidationMiddleware")
const router = express.Router()

router.post("/login", loginSchema, fieldValidationMiddleware, logInUser)
router.post("/forgotpassword", emailSchema, fieldValidationMiddleware, forgotPassword)
router.get("/resetpassword/:token", resetPasswordPage)
router.post("/resetpassword/:token", newPasswordSchema, fieldValidationMiddleware, resetPassword)


module.exports = router