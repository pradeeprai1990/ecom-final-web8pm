let express = require("express")
const { faqCreate, faqView, faqDetail, faqMultiDel, faqUpdate, faqStatusUpdate } = require("../../controller/admin/faqController")
let faqRoutes = express.Router()

faqRoutes.post("/create", faqCreate)
faqRoutes.get("/view", faqView)
faqRoutes.get("/detail/:id", faqDetail)
faqRoutes.put("/update/:id", faqUpdate)
faqRoutes.post("/multi-delete", faqMultiDel)
faqRoutes.post("/status-update", faqStatusUpdate)

module.exports = {faqRoutes}