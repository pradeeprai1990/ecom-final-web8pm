let express = require("express")
const { saveOrder } = require("../../controller/web/orderController")
const { checkToken } = require("../../middleware/checkToken")

let orderRoute = express.Router()
orderRoute.post('/order-save',checkToken,saveOrder)
module.exports={orderRoute}