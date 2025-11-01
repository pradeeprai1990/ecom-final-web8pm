let express = require("express")
const { colorCreate, colorView, colorDelete, colorDetail, colorUpdate, colorDeleteMulti, statusUpdate } = require("../../controller/admin/colorController")
let colorRoutes = express.Router()

//http://localhost:8000/admin/color/create
colorRoutes.post("/create", colorCreate)
//http://localhost:8000/admin/color/view
colorRoutes.get("/view", colorView)
//http://localhost:8000/admin/color/delete
colorRoutes.delete("/delete/:id", colorDelete)
//http://localhost:8000/admin/color/delete
colorRoutes.post("/multi-delete/", colorDeleteMulti)
//http://localhost:8000/admin/color/detail
colorRoutes.get("/detail/:id", colorDetail)
//http://localhost:8000/admin/color/update
colorRoutes.put("/update/:id", colorUpdate)
//http://localhost:8000/admin/color/update
colorRoutes.post("/status-update/", statusUpdate)

module.exports = {colorRoutes}