let express = require("express")
const { subSubCategoryCreate, subSubCategoryParentCategory, subCategorySubCategory, subSubCatView, subSubCatDelete, subSubCatChangeStatus, subSubCatDetail, subSubCatUpdate } = require("../../controller/admin/subSubCategoryController")
const multer = require("multer")
let subSubCategoryRoutes = express.Router()

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "uploads/sub-sub-category")
    },
    filename:function(req, file, cb){
        cb(null, Date.now() +'_'+ file.originalname)
    }
})

let uploads = multer({storage:storage})

subSubCategoryRoutes.post("/create", uploads.single('subSubCatImg') ,subSubCategoryCreate)
subSubCategoryRoutes.get("/parent-category", subSubCategoryParentCategory)
subSubCategoryRoutes.get("/sub-category/:pid", subCategorySubCategory)
subSubCategoryRoutes.get("/view", subSubCatView)
subSubCategoryRoutes.post("/delete", subSubCatDelete)
subSubCategoryRoutes.post("/change-status", subSubCatChangeStatus)
subSubCategoryRoutes.get("/detail/:id", subSubCatDetail)
subSubCategoryRoutes.put("/update/:id", uploads.single('subSubCatImg'), subSubCatUpdate)

module.exports = {subSubCategoryRoutes}