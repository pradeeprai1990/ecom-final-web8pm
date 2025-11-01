const { categoryModel } = require("../../models/categoryModel")
const { subCategoryModel } = require("../../models/subCategoryModel")
const { subSubCategoryModel } = require("../../models/subSubCategoryModel")

let subSubCategoryParentCategory = async (req, res) => {
    let data = await categoryModel.find().select('categoryName')
    let obj = {
        status: 1,
        data
    }
    res.send(obj)

}

let subCategorySubCategory = async (req, res) => {
    let { pid } = req.params
    let data = await subCategoryModel.find({ categoryId: pid }).select('subCategoryName')
    let obj = {
        status: 1,
        data
    }
    res.send(obj)
}

let subSubCategoryCreate = async (req, res) => {
    try {
        let objFile = { ...req.body }
        if (req.file) {
            objFile["subSubCatImg"] = req.file.filename
        }
        let subSubCatCollection = await subSubCategoryModel(objFile)
        let insRes = await subSubCatCollection.save()

        let obj = {
            status: 1,
            msg: "Added Successfully..!",
            insRes
        }

        res.send(obj)
    } catch (err) {
        console.log(err);

        let obj = {
            status: 0,
            err
        }

        res.send(obj)
    }
}

let subSubCatView = async (req, res) => {
    let skip = 0
    let limit = 3

    if (req.query.limit) {
        limit = req.query.limit
    }

    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }

    let data = await subSubCategoryModel.find().populate('parentCatId', 'categoryName').populate('subCatId', 'subCategoryName').skip(skip).limit(limit)
    let dataLength = await subSubCategoryModel.find()
    let obj = {
        status: 1,
        data,
        totPage: Math.ceil(dataLength.length / limit),
        staticPath: process.env.SUBSUBCATIMGPATH
    }

    res.send(obj)
}

let subSubCatDelete = async (req, res) => {
    let { ids } = req.body
    let delResArr = []
    for (let id of ids) {
        let delRes = await subSubCategoryModel.deleteOne({ _id: id })
        delResArr.push(delRes)
    }

    let obj = {
        status: 1,
        msg: "Deleted Successfully..!",
        delResArr
    }
    res.send(obj)
}

let subSubCatChangeStatus = async (req, res) => {
    let { ids } = req.body
    let updResArr = []
    for (let id of ids) {
        let subSubCatCollections = await subSubCategoryModel.findOne({ _id: id })
        let oldStatus = subSubCatCollections.subSubCatStatus
        let updRes = await subSubCategoryModel.updateOne(
            { _id: id },
            {
                $set: { subSubCatStatus: !oldStatus }
            }
        )

        updResArr.push(updRes)
    }

    let obj = {
        status: 1,
        msg: "Updated Successfully..!",
        updResArr
    }

    res.send(obj)
}

let subSubCatDetail = async (req, res) => {
    let { id } = req.params
    let data = await subSubCategoryModel.findOne({ _id: id }).populate('parentCatId', 'categoryName').populate('subCatId', 'subCategoryName')
    let obj = {
        status: 1,
        data,
        staticPath: process.env.SUBSUBCATIMGPATH
    }
    res.send(obj)
}

let subSubCatUpdate = async (req, res) => {
    try {
        let { id } = req.params
        let objFile = req.body
        if (req.file) {
            objFile["subSubCatImg"] = req.file.filename
        }

        console.log(req.file);
        

        let updRes = await subSubCategoryModel.updateOne(
            { _id: id },
            {
                $set: objFile
            }
        )
        let obj = {
            status: 1,
            msg: "Updated Successfully..!",
            updRes
        }

        res.send(obj)
    } catch (err) {
        console.log(err);
        
        let obj = {
            status: 0,
            err
        }

        res.send(obj)
    }

}

module.exports = { subSubCategoryParentCategory, subCategorySubCategory, subSubCategoryCreate, subSubCatView, subSubCatDelete, subSubCatChangeStatus, subSubCatDetail, subSubCatUpdate }