let mongoose = require("mongoose")
let subCategorySchema = mongoose.Schema(
    {
        subCategoryImg:String,
        subCategoryName:String,
        subCategoryOrder:Number,
        categoryId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"category",
            requrired:true
        },
        subCategoryStatus:{
            type:Boolean,
            default:true
        }
    }
)

let subCategoryModel = mongoose.model("sub_category",subCategorySchema)
module.exports = {subCategoryModel}