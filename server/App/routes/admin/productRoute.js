let express = require("express")
const { getParentCat, getSubCat, getSubSubCat, getMaterial, getColor, productCreate, getProductView, productDelete, productChangeStatus } = require("../../controller/admin/productController")
const multer = require("multer")
let ProductRoutes = express.Router()

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname == 'productImage') {
            cb(null, "uploads/product/product-img")
        } else if (file.fieldname == 'backImage') {
            cb(null, "uploads/product/back-img")
        } else if (file.fieldname == 'gallaryImage') {
            cb(null, "uploads/product/gallary-img")
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

let upload = multer({ storage: storage })

ProductRoutes.get("/parent-category", getParentCat)
ProductRoutes.get("/sub-category/:id", getSubCat)
ProductRoutes.get("/sub-sub-category/:id", getSubSubCat)
ProductRoutes.get("/material", getMaterial)
ProductRoutes.get("/color", getColor)

ProductRoutes.post("/create", upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "gallaryImage", maxCount: 100 }
]), productCreate)

ProductRoutes.get("/view", getProductView)
ProductRoutes.post("/delete", productDelete)
ProductRoutes.put("/change-status", productChangeStatus)

module.exports = { ProductRoutes }