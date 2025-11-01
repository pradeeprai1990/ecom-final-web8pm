const { faqModel } = require("../../models/faqModel")

let faqCreate = async (req, res) => {
    try {
        let faqCollection = await faqModel(req.body)
        let insRes = await faqCollection.save()
        let obj = {
            status: 1,
            msg: "Added Successfully..!",
            insRes
        }

        res.status(200).json(obj)
    } catch (err) {
        let obj = {
            status: 1,
            msg: "Added Successfully..!",
            err
        }

        res.status(200).json(obj)
    }

}

let faqView = async (req, res) => {
    let skip = 1
    let limit =5

    if(req.query.limit){
        limit  = req.query.limit
    }

    if(req.query.page){
        skip = (req.query.page - 1)*limit
    }

    let data = await faqModel.find().skip(skip).limit(limit)
   let dataLength = await faqModel.find()
    let obj = {
        status: 1,
        msg: "success",
        data,
        totPage:Math.ceil(dataLength.length/limit)
    }

    res.status(200).json(obj)
}

let faqDetail = async (req, res) => {
    let { id } = req.params
    let data = await faqModel.findOne({ _id: id })
    let obj = {
        status: 1,
        msg: "success",
        data
    }

    res.status(200).json(obj)
}

let faqUpdate = async (req, res) => {
    let { id } = req.params
    let updRes = await faqModel.updateOne(
        { _id: id },
        {
            $set: req.body
        }
    )
    let obj = {
        status: 1,
        msg: "Updated Successfully..!",
        updRes
    }

    res.send(obj)
}

let faqMultiDel = async (req, res) => {
    try {
        let { ids } = req.body
        let delRes = await faqModel.deleteMany({ _id: ids })
        let obj = {
            status: 1,
            msg: "Deleted Successfully..!",
            delRes
        }
        res.send(obj)
    } catch (err) {
        let obj = {
            status: 0,
            msg: "Failed",
            err
        }
        res.send(obj)
    }

}

let faqStatusUpdate = async (req, res) => {
    let { ids } = req.body
    let updResArr = []
    for (let id of ids) {
        let data = await faqModel.findOne({ _id: id })
        let newStatus = data.staus
        let updRes = await faqModel.updateOne(
            {_id:id},
            {
                $set:{staus:!newStatus}
            }
        )
        updResArr.push(updRes)
    }
    let obj = {
        status: 1,
        msg:"Change Status Successfully..!",
        updResArr
    }

    res.send(obj)
}

module.exports = { faqCreate, faqView, faqDetail, faqUpdate, faqMultiDel, faqStatusUpdate }