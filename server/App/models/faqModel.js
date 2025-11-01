let mongoose = require("mongoose")
let faqSchema = mongoose.Schema(
    {
        question:String,
        answer:String,
        order:Number,
        staus:{
            type:Boolean,
            default:true
        }
    }
)

let faqModel = mongoose.model("faq",faqSchema)
module.exports = {faqModel}