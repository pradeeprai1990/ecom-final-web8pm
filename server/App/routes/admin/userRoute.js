let express = require("express")
const { userView, userChangeStatus, userConatctUsData } = require("../../controller/admin/userController")
let userRoutes = express.Router()

userRoutes.get("/view", userView)
userRoutes.put("/change-status", userChangeStatus)
userRoutes.get("/user-contact", userConatctUsData)

module.exports = {userRoutes}