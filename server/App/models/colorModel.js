let mongoose = require("mongoose")
let colorSchema = mongoose.Schema(
    {
        colorName:{
            type:String,
            minLenght:3,
            maxLength:20,
            unique:true,
            required: true 
        },
        colorCode:{
            type:String,
            minLenght:3,
            maxLength:20,
        },
        colorOrder:Number,
        colorStatus:{
            type:Boolean,
            default:true
        }
    }
)

let colorModel = mongoose.model("color",colorSchema)

module.exports = {colorModel}