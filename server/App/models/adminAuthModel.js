let mongoose = require("mongoose")
let adminAuthSchema = mongoose.Schema(
    {
        name:String,
        email:String,
        phone:Number,
        password:String,
        profileImg:String
    }
)

let adminAuthModel = mongoose.model("admin",adminAuthSchema)
module.exports = {adminAuthModel}