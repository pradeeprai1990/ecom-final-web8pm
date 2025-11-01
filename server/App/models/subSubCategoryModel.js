let mongoose = require("mongoose")
let subSubCategorySchema = mongoose.Schema(
    {
        subSubCatImg:String,
        parentCatId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"category",
            required:true
        },
        subCatId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"sub_category",
            required:true
        },
        subSubCatName:String,
        subSubCatOrder:Number,
        subSubCatStatus:{
            type:Boolean,
            default:true
        }
    }
)

let subSubCategoryModel = mongoose.model("sub_sub_category",subSubCategorySchema)
module.exports = {subSubCategoryModel}