let mongoose = require("mongoose")
let materialSchema = mongoose.Schema(
    {
        materialName: {
            type: String,
            minLength: 3,
            maxLength: 20,
            unique: true
        },
        materialOrder: Number,
        materialStatus: {
            type: Boolean,
            default: true
        }
    }
)

let materialModel = mongoose.model("material", materialSchema)
module.exports = { materialModel }