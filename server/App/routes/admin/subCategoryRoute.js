let express = require("express")
const { subCategoryCreate, subCategoryView, categoryName, subCategoryDelete, subCatStatusChange, subCategoryDetail, subCategoryUpdate } = require("../../controller/admin/subCategoryController")
const multer = require("multer")
let subCategoryRoutes = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/sub-category")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

let uplods = multer({storage:storage})

subCategoryRoutes.post("/create", uplods.single('subCategoryImg') ,subCategoryCreate)
subCategoryRoutes.get("/view", subCategoryView)
subCategoryRoutes.get("/category", categoryName)
subCategoryRoutes.post("/delete", subCategoryDelete)
subCategoryRoutes.post("/change-status", subCatStatusChange)
subCategoryRoutes.get("/detail/:id", subCategoryDetail)
subCategoryRoutes.put("/update/:id", uplods.single('subCategoryImg'), subCategoryUpdate)

module.exports = { subCategoryRoutes }