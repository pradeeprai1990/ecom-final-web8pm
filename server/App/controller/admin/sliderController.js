const { sliderModel } = require("../../models/sliderModel")

let sliderCrete = async (req, res) => {
    let objFile = {...req.body}
    objFile["sliderImg"] = req.file.filename
    
    let sliderCollection = await sliderModel(objFile)
    let insRes = await sliderCollection.save()

    let obj = {
        status:1,
        msg:"Sccessfully Inserted..!",
        insRes
    }
    res.send(obj)
}


let sliderVew = async (req, res) => {
    let skip = 1
    let limit = 3
    if(req.query.limit){
        limit = req.query.limit
    }
    if(req.query.page){
        skip=(req.query.page - 1)*limit
    }
    let data = await sliderModel.find().skip(skip).limit(limit)
    let dataLength = await sliderModel.find()
    let obj = {
        status:1,
        staticPath:process.env.SLIDERIMGPATH,
        totPage:Math.ceil(dataLength.length/limit),
        data
    }

    res.send(obj)
}

let sliderDelete = async (req, res) => {
    let {ids} = req.body
    let delResArr = []
    for(let id of ids){
        let delRes = await sliderModel.deleteOne({_id:id})
        delResArr.push(delRes)
    }

    let obj = {
        status:1,
        msg:"Successfully Deleted..!",
        delResArr
    }

    res.status(200).json(obj)
}

let sliderChangeStatus = async (req, res) => {
   let {ids} = req.body
   let updResArr = []
   for(let id of ids){
    let getStatus = await sliderModel.findOne({_id:id})
    let status = getStatus.sliderStatus
    let updRes = await sliderModel.updateOne(
        {_id:id},
        {
            $set:{sliderStatus:!status}
        }
    )
    updResArr.push(updRes)
   }

   let obj = {
    status:1,
    msg:"Update Successfully..!",
    updResArr
   }

   res.status(200).json(obj)

}

module.exports = {sliderCrete, sliderVew, sliderDelete, sliderChangeStatus}