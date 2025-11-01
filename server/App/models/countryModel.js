let mongoose = require("mongoose")

let countrySchema = (
    {
        countryName:{
            type:String,
            minLength:3,
            maxLength:20,
            unique:true
        },
        countryOrder:Number,
        countryStatus:{
            type:Boolean,
            default:true
        }
    }
)
let countryModel = mongoose.model("country",countrySchema)
module.exports = {countryModel}