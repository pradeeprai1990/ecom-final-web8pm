let express = require("express")
const { userAuthRoute } = require("./userAuthRoute")
const { homeRoutes } = require("./homeRoute")
const { cartRoutes } = require("./cartRoute")
const { productRoutes } = require("./productRoutes")
let webRoutes = express.Router()

webRoutes.use("/user-auth", userAuthRoute)
webRoutes.use("/home", homeRoutes)
webRoutes.use("/cart", cartRoutes)

webRoutes.use("/product", productRoutes)

module.exports = {webRoutes}

