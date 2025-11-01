let express = require("express")
const { whyChooseUseCreate, whyChooseUseView, whyChooseUsDelete, whyChooseUsChangeStatus } = require("../../controller/admin/whyChooseUsController")
const multer = require("multer")
let whyChooseUsRoutes = express.Router()

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "uploads/why-choose-us")
    },
    filename:function(req, file, cb){
        cb(null, Date.now()+'_'+file.originalname)
    }
}) 

const uploads = multer({storage:storage})

whyChooseUsRoutes.post("/create",uploads.single('img'), whyChooseUseCreate)
whyChooseUsRoutes.get("/view", whyChooseUseView)
whyChooseUsRoutes.post("/delete", whyChooseUsDelete)
whyChooseUsRoutes.put("/change-status",whyChooseUsChangeStatus)

module.exports = {whyChooseUsRoutes}