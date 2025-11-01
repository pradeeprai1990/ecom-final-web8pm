const { materialModel } = require("../../models/materialModel")


let materialCreate = async (req, res) => {
    let obj
    let errMsg
    try {
        let materialCollection = await materialModel(req.body)
        let insertRes = await materialCollection.save()
        obj = {
            status: 1,
            msg: "Added Successfully..!",
            insertRes
        }

        res.status(200).json(obj)
    } catch (err) {
        if (err.code == 11000) {
            errMsg = "Material Already Exist..!"
        }
        obj = {
            status: 0,
            msg: errMsg,
            errMsg
        }

        res.send(obj)
    }

}

let materialView = async (req, res) => {
    let skip = 0
    let limit = 5
    if(req.query.limit){
        limit = req.query.limit
    }
    if(req.query.page){
        skip = (req.query.page-1)*limit
    }
    let data = await materialModel.find().skip(skip).limit(limit)
    let dataLength = await materialModel.find()
    let obj = {
        status: 1,
        msg: "success",
        data,
        totPage:Math.ceil(dataLength.length/limit)
    }

    res.send(obj)
}

let materialDelete = async (req, res) => {
    let { id } = req.params
    let delRes = await materialModel.deleteOne({ _id: id })
    let obj = {
        status: 1,
        msg: "success",
        delRes
    }

    res.send(obj)
}

let materialMultiDelete = async (req, res) => {
    try {
        let {ids} = req.body
        let deleteRes = await materialModel.deleteMany({ _id: ids })
        let obj = {
            status: 1,
            msg: 'Deleted Successfully..!',
            deleteRes
        }

        res.send(obj)
    } catch (err) {
        let obj = {
            status: 0,
            msg: 'Deleted Error..!',
            err
        }

        res.send(obj)
    }

}

let materialDetail = async (req, res) => {
    let {id} = req.params
    let data = await materialModel.findOne({_id:id})
    let obj = {
        status:1,
        msg: 'materialDetail',
        data
    }

    res.send(obj)
}

let materialUpdate = async (req, res) => {
    let {id} = req.params
    let updRes = await materialModel.updateOne(
        {_id:id},
        {
            $set:req.body
        }
    )
    let obj = {
        status:1,
        msg: 'Update Successfully..!',
        updRes
    }

    res.send(obj)
}

let statusUpdate = async (req, res) => {
    let {ids} = req.body
    let updArrRes = []
    for(let id of ids){
        let oldStatus = await materialModel.findOne({_id:id})
        let status = oldStatus.materialStatus
        let updRes = await materialModel.updateOne(
            {_id:id},
            {
                $set:{materialStatus:!status}
            }
        )
        updArrRes.push(updRes)
    }
    let obj = {
        status:1,
        msg:"Change Status Successfully..!",
        updArrRes
    }

    res.send(obj)
}

module.exports = { materialCreate, materialView, materialDelete, materialMultiDelete, materialDetail, materialUpdate, statusUpdate}

