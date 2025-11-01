let mongoose = require("mongoose")
let sliderSchema = mongoose.Schema(
    {
        sliderImg:String,
        sliderTitle:String,
        sliderOrder:Number,
        sliderStatus:{
            type:Boolean,
            default:true
        }
    }
)

let sliderModel = mongoose.model("slider",sliderSchema)
module.exports = {sliderModel}