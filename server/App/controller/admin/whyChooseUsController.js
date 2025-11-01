const { whyChooseUsModel } = require("../../models/whyChooseUsModel")

let whyChooseUseCreate = async (req, res) => {
    let objBody = { ...req.body }
    objBody["whyChooseUsImg"] = req.file.filename
    try {
        let whyChooseUsCollection = await whyChooseUsModel(objBody)
        let insRes = await whyChooseUsCollection.save();
        let obj = {
            status: 1,
            msg: 'Added Successfully..!',
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

let whyChooseUseView = async (req, res) => {
    let skip = 1
    let limit = 3

    if (req.query.limit) {
        limit = req.query.limit
    }

    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }

    let data = await whyChooseUsModel.find().skip(skip).limit(limit)
    let dataLength = await whyChooseUsModel.find()

    let obj = {
        status: 1,
        staticPath: process.env.WHYCHOOSEUSIMGPATH,
        totPage: Math.ceil(dataLength.length/limit),
        data
    }
    console.log(obj);

    res.send(obj)
}

let whyChooseUsDelete = async (req, res) => {
    let { ids } = req.body
    let delResArr = []
    for (let id of ids) {
        let delRes = await whyChooseUsModel.deleteOne({ _id: id })
        delResArr.push(delRes)
    }
    let obj = {
        status: 1,
        msg: "Deleted Successfully..!",
        delResArr
    }

    res.send(obj)
}

let whyChooseUsChangeStatus = async (req, res) => {
    let { ids } = req.body
    let updResArr = []
    for (let id of ids) {
        let status = await whyChooseUsModel.findOne({ _id: id })
        let whyChooseUsStatus = status.whyChooseUsStatus
        let updRes = await whyChooseUsModel.updateOne(
            { _id: id },
            {
                $set: { whyChooseUsStatus: !whyChooseUsStatus }
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

module.exports = { whyChooseUseCreate, whyChooseUseView, whyChooseUsDelete, whyChooseUsChangeStatus }