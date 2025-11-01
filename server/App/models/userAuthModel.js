let mongoose = require("mongoose")
let userAuthSchema = mongoose.Schema(
    {
        userName:String,
        userEmail:{
            type:String,
            unique:true
        },
        userPhone:Number,
        userPassword:String,
        billingAddrerss:Object,
        shippingAddress:Object,
        status:{
            type:Boolean,
            default:true
        }
    }
)

let userAuthModel = mongoose.model("user",userAuthSchema)
module.exports = {userAuthModel}