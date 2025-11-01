let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
const { adminRoutes } = require("./App/routes/admin/adminRoute")
const { adminAuthModel } = require("./App/models/adminAuthModel")
const { webRoutes } = require("./App/routes/web/webRoute")
require("dotenv").config()
let App = express()
App.use(cors())
App.use(express.json())

//http://localhost:8000/admin
App.use("/admin", adminRoutes)
App.use("/web", webRoutes)
App.use("/uploads/category", express.static("uploads/category"))
App.use("/uploads/why-choose-us", express.static("uploads/why-choose-us"))
App.use("/uploads/slider", express.static("uploads/slider"))
App.use("/uploads/sub-category", express.static("uploads/sub-category"))
App.use("/uploads/sub-sub-category", express.static("uploads/sub-sub-category"))
App.use("/uploads/product/product-img", express.static("uploads/product/product-img"))
App.use("/uploads/admin-profile", express.static("uploads/admin-profile"))

mongoose.connect(process.env.DBCONNECTION)
    .then(async (res) => {
        let data = await adminAuthModel.find()
        if (data.length == 0) {
            await adminAuthModel.insertOne(
                {
                    name: 'admin',
                    email: 'admin@gmail.com',
                    password: 'admin@123',
                    phone: '888888888'
                }
            )
        }

        App.listen(process.env.PORT, () => {
            console.log('Server Start');
        })
    })
