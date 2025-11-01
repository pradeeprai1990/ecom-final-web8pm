let mongoose = require("mongoose")
let productSchema = mongoose.Schema(
    {
        productName: String,
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true
        },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "sub_category",
            required: true,
        },
        subSubCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "sub_sub_category",
            required: true
        },
        material: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "material",
                required: true
            }
        ],
        color: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "color",
                required: true
            }
        ],
        productType: Number,
        bestSelling: Number,
        topRated: Number,
        upsell: Number,
        actualPrice: Number,
        salePrice: Number,
        totStock: Number,
        order: Number,
        productImage: String,
        backImage: String,
        gallaryImage: Object,
        slug:String,
        status: {
            type: Boolean,
            default: true
        }
    }
)

let productModel = mongoose.model("product",productSchema)

module.exports = {productModel}