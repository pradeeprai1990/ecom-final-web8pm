const { countryModel } = require("../../models/countryModel")

let countryCreate = async (req, res) => {
    try {
        let countryCollection = await countryModel(req.body)
        let insRes = await countryCollection.save()
        let obj = {
            status: 1,
            msg: "Added Successfully..!",
            insRes
        }

        res.status(200).json(obj)
    } catch (err) {
        let obj = {
            status: 0,
            msg: "Country name already exist..!",
            err
        }
        res.send(obj)
    }
}

let countryView = async (req, res) => {
    let skip=1
    let limit=2

    if(req.query.limit){
        limit = req.query.limit
    }

    if(req.query.page){
        skip = (req.query.page-1)*limit
    }

    let data = await countryModel.find().skip(skip).limit(limit)
    let dataLength = await countryModel.find()
    let obj = {
        status: 1,
        msg: "success",
        data,
        totPage:Math.ceil(dataLength.length/limit)
    }

    res.send(obj)
}

let countryDetail = async(req, res) => {
    let {id} = req.params
    let data = await countryModel.findOne({_id:id})
    let obj = {
        status:1,
        msg:"success",
        data
    }

    res.send(obj)
}

let countryUpdate = async (req, res) => {
    let {id} = req.params
    let updRes = await countryModel.updateOne(
        {_id:id},
        {
            $set:req.body
        }
    )
    let obj = {
        status:1,
        msg:"Successfully Update..!",
        updRes
    }

    res.send(obj)
}

let countryMultiDelete = async (req, res) => {
    try {
        let { ids } = req.body
        let delRes = await countryModel.deleteMany({ _id: ids })
        let obj = {
            status: 1,
            msg: "deleted Successfully..!",
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

let countryStatusUpdate = async (req, res) => {
    let {ids} = req.body
    let updArrRes = []
    for(let id of ids){
        let data = await countryModel.findOne({_id:id})
        let status = data.countryStatus
        let updRes = await countryModel.updateOne(
            {_id:id},
            {
                $set:{countryStatus:!status}
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

module.exports = { countryCreate, countryView, countryDetail, countryUpdate, countryMultiDelete , countryStatusUpdate }