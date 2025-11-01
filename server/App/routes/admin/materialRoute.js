let express = require("express")
const { materialCreate, materialView, materialDelete, materialMultiDelete, materialDetail, materialUpdate, statusUpdate } = require("../../controller/admin/materialController")
let materialRoute = express.Router()

materialRoute.post("/create", materialCreate)
materialRoute.get("/view", materialView)
materialRoute.delete("/delete/:id", materialDelete)
materialRoute.post("/multi-delete", materialMultiDelete)
materialRoute.get("/detail/:id", materialDetail)
materialRoute.put("/update/:id", materialUpdate)
materialRoute.post("/status-update/", statusUpdate)

module.exports = {materialRoute}