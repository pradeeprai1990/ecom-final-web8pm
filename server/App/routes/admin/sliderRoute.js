let express = require("express")
const { sliderCrete, sliderVew, sliderDelete, sliderChangeStatus } = require("../../controller/admin/sliderController")
const multer = require("multer")
let sliderRoutes = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/slider")
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

let uploads = multer({ storage: storage })

sliderRoutes.post("/create", uploads.single('sliderImg'), sliderCrete)
sliderRoutes.get("/view", sliderVew)
sliderRoutes.post("/delete",sliderDelete)
sliderRoutes.put("/change-status", sliderChangeStatus)

module.exports = { sliderRoutes }