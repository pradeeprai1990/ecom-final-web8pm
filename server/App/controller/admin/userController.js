const { contactUsModel } = require("../../models/contactUsModel")
const { userAuthModel } = require("../../models/userAuthModel")

let userView = async (req, res) => {
    let data = await userAuthModel.find()
    let obj = {
        status: 1,
        data
    }

    res.send(obj)
}

let userChangeStatus = async (req, res) => {
    let { ids } = req.body
    let updResArr = []
    for (let id of ids) {
        let userCollection = await userAuthModel.findOne({ _id: id })
        let status = await userCollection.status
        let updRes = await userAuthModel.updateOne(
            { _id: id },
            {
                $set: { status: !status }
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

let userConatctUsData = async (req, res) => {
    let skip = 0
    let limit = 5;
    if (req.query.limit) {
        limit = req.query.limit
    }
    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }

    let data = await contactUsModel.find().skip(skip).limit(limit)
    let dataLen = await contactUsModel.find()

    let obj = {
        status: 1,
        totPage: Math.ceil(dataLen.length / limit),
        data
    }

    res.send(obj)
}
module.exports = { userView, userChangeStatus, userConatctUsData }