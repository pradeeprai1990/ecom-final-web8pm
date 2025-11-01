let express = require("express")
const { addToCart, cartView, deleteCart } = require("../../controller/web/CartController")
const { checkToken } = require("../../middleware/checkToken")
let cartRoutes = express.Router()

cartRoutes.post('/add-to-cart', checkToken, addToCart)
cartRoutes.post('/cart-data', checkToken, cartView)
cartRoutes.post('/remove-cart', checkToken, deleteCart)

module.exports = {cartRoutes} 