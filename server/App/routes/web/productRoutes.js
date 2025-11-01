let express = require("express")
const { productDetails } = require("../../controller/web/productController")
let  productRoutes = express.Router()


productRoutes.get('/product-details/:slug',productDetails)


module.exports={productRoutes}