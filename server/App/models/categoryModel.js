let mongoose = require("mongoose")
let categorySchema = mongoose.Schema(
    {
        categoryImage:String,
        categoryName:{
            type:String,
            minLength:3,
            maxLength:20,
            unique:true
        },
        categoryOrder:Number,
        categoryStaus:{
            type:Boolean,
            default:true
        }
    }
)

let categoryModel = mongoose.model("category",categorySchema)

module.exports = {categoryModel}