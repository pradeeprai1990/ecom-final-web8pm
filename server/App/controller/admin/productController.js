const { mySlug } = require("../../config/commonFunction")
const { categoryModel } = require("../../models/categoryModel")
const { colorModel } = require("../../models/colorModel")
const { materialModel } = require("../../models/materialModel")
const { productModel } = require("../../models/productModel")
const { subCategoryModel } = require("../../models/subCategoryModel")
const { subSubCategoryModel } = require("../../models/subSubCategoryModel")

let getParentCat = async (req, res) => {
    let data = await categoryModel.find().select('categoryName')
    let obj = {
        status: 1,
        data
    }

    res.send(obj)
}

let getSubCat = async (req, res) => {
    let { id } = req.params
    let data = await subCategoryModel.find({ categoryId: id }).select('subCategoryName')
    let obj = {
        status: 1,
        data
    }

    res.send(obj)
}

let getSubSubCat = async (req, res) => {
    let { id } = req.params
    let data = await subSubCategoryModel.find({ subCatId: id }).select('subSubCatName')
    let obj = {
        status: 1,
        data
    }
    res.send(obj)
}

let getMaterial = async (req, res) => {
    let data = await materialModel.find().select('materialName')
    let obj = {
        status: 1,
        data
    }
    res.send(obj)
}

let getColor = async (req, res) => {
    let data = await colorModel.find().select('colorName')
    let obj = {
        status: 1,
        data
    }

    res.send(obj)
}

let productCreate = async (req, res) => {
    try {
        let objFile1 = req.files.productImage[0].filename
        let objFile2 = req.files.backImage[0].filename
        let objFile3 = req.files.gallaryImage.map((val) => val.filename)
        let objForm = { ...req.body }
        objForm['slug']=mySlug(req.body.productName) //Vivo V3
        if (req.files) {
            objForm["productImage"] = objFile1
            objForm["backImage"] = objFile2
            objForm["gallaryImage"] = objFile3
            let productCollections = await productModel(objForm)
            let insRes = await productCollections.save()
            let obj = {
                status: 1,
                msg: "Added Successfully..!",
                insRes
            }

            res.send(obj)
        }
    } catch (err) {
        console.log(err);
        
        let obj = {
            status: 0,
            err
        }

        res.send(obj)
    }

}

let getProductView = async (req, res) => {
    let skip = 1;
    let limit = 1;
    if(req.query.limit){
        limit = req.query.limit
    }
    if(req.query.page){
        skip = (req.query.page-1)*limit
    }
    let data = await productModel.find().populate('parentCategory','categoryName').populate('subCategory','subCategoryName').populate('subSubCategory','subSubCatName').skip(skip).limit(limit)
    let dataLen = await productModel.find()
    obj = {
        status:1,
        totalPage:Math.ceil(dataLen.length/limit),
        data
    }

    res.send(obj)
}

let productDelete = async (req, res) => {
    let {ids} = req.body
    let delResArr = []
    for(let id of ids){
        let delRes = await productModel.deleteOne({_id:id})
        delResArr.push(delRes)
    }
    let obj  = {
        status:1,
        msg:"Deleted Successfully..!",
        delResArr
    }

    res.send(obj)
}

let productChangeStatus = async (req, res) => {
    let {ids} = req.body
    let updResArr = []
    for(let id of ids){
        let productCollection = await productModel.findOne({_id:id})
        let status = await productCollection.status
        let updRes = await productModel.updateOne(
            {_id:id},
            {
                $set:{status:!status}
            }
        )
        updResArr.push(updRes)
    }

    let obj = {
        status:1,
        msg:"Change Status Successfully..!",
        updResArr
    }

    res.send(obj)
}

module.exports = { getParentCat, getSubCat, getSubSubCat, getMaterial, getColor, productCreate, getProductView, productDelete, productChangeStatus}