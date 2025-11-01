const { categoryModel } = require("../../models/categoryModel")

let categoryCreate = async (req, res) => {
    try {
        let obj
        let fileObj = { ...req.body }
        fileObj["categoryImage"] = req.file.filename

        if (fileObj["categoryImage"]) {
            let categoryCollection = await categoryModel(fileObj)
            let insRes = await categoryCollection.save()
            obj = {
                status: 1,
                staticPath: process.env.CATEGORYIMGPATH,
                msg: "Uploaded Successfully..!",
                insRes
            }
            res.send(obj)

        }

        console.log(obj);
    } catch (err) {
        let obj = {
            status: 0,
            err
        }
        res.send(obj)
    }
}

let categoryView = async (req, res) => {
    let skip = 0
    let limit = 3

    if (req.query.limit) {
        limit = req.query.limit
    }

    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }

    let data = await categoryModel.find().skip(skip).limit(limit)
    let dataLength = await categoryModel.find()
    let obj = {
        status: 1,
        staticPath: process.env.CATEGORYIMGPATH,
        totPage: Math.ceil(dataLength.length / limit),
        data
    }

    res.send(obj)
}

let categoryDelete = async (req, res) => {
    let { ids } = req.body
    let delsResArr = []
    for (let id of ids) {
        let delRes = await categoryModel.deleteOne({ _id: id })
        delsResArr.push(delRes)
    }

    let obj = {
        status: 1,
        msg: "Deleted Successfully..!",
        delsResArr
    }

    res.send(obj)
}

let categoryChangeStatus = async (req, res) => {
    let { ids } = req.body
    let updResArr = []
    for (let id of ids) {
        let categoryCollection = await categoryModel.findOne({ _id: id })
        let categoryStaus = categoryCollection.categoryStaus
        let updRes = await categoryModel.updateOne(
            { _id: id },
            {
                $set: { categoryStaus: !categoryStaus }
            }
        )

        updResArr.push(updRes)
    }

    let obj = {
        status: 1,
        msg: "Change Status Successfully..!",
        updResArr
    }

    res.send(obj)
}

let categoryDetail = async (req, res) => {
    let { id } = req.params
    let data = await categoryModel.findOne({ _id: id })
    let obj = {
        status: 1,
        data,
        staticPath: process.env.CATEGORYIMGPATH
    }

    res.send(obj)
}

let categoryUpdate = async (req, res) => {
    try {
        let { id } = req.params
        let objFile = { ...req.body }
        if (req.file) {
            objFile["categoryImage"] = req.file.filename
        }
        let updRes = await categoryModel.updateOne(
            { _id: id },
            {
                $set: objFile
            }
        )
        let obj = {
            status: 1,
            msg: "Successfully Updated..!",
            updRes
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

module.exports = { categoryCreate, categoryView, categoryDelete, categoryChangeStatus, categoryDetail, categoryUpdate }