let express = require("express")
const { countryCreate, countryView, countryDetail, countryUpdate, countryMultiDelete, countryStatusUpdate } = require("../../controller/admin/countryController")
let countryRoutes = express.Router()

countryRoutes.post("/create", countryCreate)
countryRoutes.get("/view", countryView)
countryRoutes.get("/detail/:id", countryDetail)
countryRoutes.put("/update/:id", countryUpdate)
countryRoutes.post("/multi-delete", countryMultiDelete)
countryRoutes.post("/status-update", countryStatusUpdate)

module.exports = { countryRoutes }