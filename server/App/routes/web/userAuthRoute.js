let express = require("express")
const { userOtp, userCreate, userLogin, adminContactDetails, userContactUsDataSave, userGoogleLogin, userChangePassword, saveProfileBilling, saveProfileShipping, profileView} = require("../../controller/web/userAuthController")
const { checkToken } = require("../../middleware/checkToken")
let userAuthRoute = express.Router()

userAuthRoute.post("/send-otp",userOtp)
userAuthRoute.post("/create", userCreate)
userAuthRoute.post("/login", userLogin)
userAuthRoute.get("/admin-contact-detail", adminContactDetails)
userAuthRoute.post("/contact-save", userContactUsDataSave)
userAuthRoute.post("/google-login", userGoogleLogin)
userAuthRoute.post("/change-password", checkToken, userChangePassword)
userAuthRoute.post("/save-Profile-billing", checkToken, saveProfileBilling)
userAuthRoute.post("/save-Profile-shipping", checkToken, saveProfileShipping)
userAuthRoute.post("/profile-view", checkToken, profileView)

module.exports = {userAuthRoute}

