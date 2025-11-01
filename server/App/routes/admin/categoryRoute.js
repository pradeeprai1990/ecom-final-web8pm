let express = require("express")
const multer = require('multer')
const { categoryCreate, categoryView, categoryDelete, categoryChangeStatus, categoryDetail, categoryUpdate } = require("../../controller/admin/categoryController")
let categoryRouts = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/category")
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+'_'+file.originalname)
    }
})

const upload = multer({ storage: storage })

categoryRouts.post("/create", upload.single('categoryImage'), categoryCreate)
categoryRouts.get("/view", categoryView)
categoryRouts.post("/delete", categoryDelete)
categoryRouts.post("/change-status", categoryChangeStatus)
categoryRouts.get("/detail/:id", categoryDetail)
categoryRouts.put("/update/:id", upload.single('categoryImage'), categoryUpdate)

module.exports = { categoryRouts }