const { categoryModel } = require("../../models/categoryModel")
const { subCategoryModel } = require("../../models/subCategoryModel")

let subCategoryCreate = async (req, res) => {
    let objFile = { ...req.body }
    objFile["subCategoryImg"] = req.file.filename

    try {
        let subCategoryCollection = await subCategoryModel(objFile)
        let insRes = await subCategoryCollection.save()

        let obj = {
            status: 1,
            msg: "Added Successfully..!",
            insRes
        }

        res.send(obj)
    } catch (err) {


        let obj = {
            status: 0,
            err
        }

        res.send(obj)
    }
}

let subCategoryView = async (req, res) => {
    let skip = 0
    let limit = 3
    if (req.query.limit) {
        limit = req.query.limit
    }
    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }

    let data = await subCategoryModel.find().populate('categoryId', 'categoryName').skip(skip).limit(limit)
    let dataLength = await subCategoryModel.find()
    let obj = {
        status: 1,
        totPage: Math.ceil(dataLength.length / limit),
        staticPath: process.env.SUBCATIMGPATH,
        data
    }

    res.send(obj)
}

let subCategoryDelete = async (req, res) => {
    let { ids } = req.body
    let delResArr = []
    for (let id of ids) {
        let delRes = await subCategoryModel.deleteOne({ _id: id })
        delResArr.push(delRes)
    }

    let obj = {
        status: 1,
        msg: "Deleted Successfully..!",
        delResArr
    }

    res.send(obj)
}

let subCatStatusChange = async (req, res) => {
    let { ids } = req.body
    let updResArr = []
    for (let id of ids) {
        let subCatCollection = await subCategoryModel.findOne({ _id: id })
        let status = subCatCollection.subCategoryStatus
        let updRes = await subCategoryModel.updateOne(
            { _id: id },
            {
                $set: { subCategoryStatus: !status }
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

let categoryName = async (req, res) => {
    let data = await categoryModel.find().select('categoryName')
    let obj = {
        status: 1,
        data
    }
    res.send(obj)
}

let subCategoryDetail = async (req, res) => {
    let { id } = req.params
    let data = await subCategoryModel.findOne({ _id: id })
    let obj = {
        status: 1,
        data,
        staticPath: process.env.SUBCATIMGPATH
    }

    res.send(obj)
}

let subCategoryUpdate = async (req, res) => {
    let { id } = req.params
    let objFile = { ...req.body }
    if (req.file) {
        objFile["subCategoryImg"] = req.file.filename
    }

    let updRes = await subCategoryModel.updateOne(
        { _id: id },
        {
            $set: objFile
        }
    )

    obj = {
        status: 1,
        msg: "Update Successfully..!",
        updRes
    }
    res.send(obj)

}

module.exports = { subCategoryCreate, subCategoryView, subCategoryDelete, subCatStatusChange, categoryName, subCategoryDetail, subCategoryUpdate }