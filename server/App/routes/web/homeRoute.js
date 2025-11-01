let express = require("express")
const { getHomeCategory, getProductByCategory, getSlider, getBestSellingProduct } = require("../../controller/web/homeController")
let homeRoutes = express.Router()

homeRoutes.get('/category', getHomeCategory)
homeRoutes.get('/product/:pid', getProductByCategory)
homeRoutes.get('/slider', getSlider)
homeRoutes.get('/best-selling-product', getBestSellingProduct)

module.exports = {homeRoutes}