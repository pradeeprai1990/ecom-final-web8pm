let mongoose = require("mongoose")
let whyChooseUsSchema = mongoose.Schema(
    {
        whyChooseUsImg:String,
        whyChooseUsTitle:String,
        whyChooseUsOrder:Number,
        whyChooseUsDesc:String,
        whyChooseUsStatus:{
            type:Boolean,
            default:true
        }
    }
)

let whyChooseUsModel = mongoose.model("why_choose_us",whyChooseUsSchema)

module.exports = {whyChooseUsModel}