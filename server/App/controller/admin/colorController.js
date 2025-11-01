const { colorModel } = require("../../models/colorModel")


let colorCreate = async (req, res) => {
    let obj
    let errmsg
    try {
        let colorCollection = await colorModel(req.body)
        let insertRes = await colorCollection.save()
        obj = {
            status: 1,
            msg: "Added Successfully",
            insertRes
        }
        res.status(200).json(obj)
    } catch (err) {
        if (err.code == 11000) {
            errmsg = 'Color Name is Already Exist'
        }
        if (err.errors) {
            errmsg = err.errors.colorName.message
        }
        obj = {
            sataus: 0,
            msg: errmsg,
        }
        res.send(obj)
    }



}

let colorView = async (req, res) => {
    let skip = 0
    let limit = 5
    if(req.query.limit){
        limit=req.query.limit
    }
    if(req.query.page){
        skip=(req.query.page-1)*limit
    }
    let data = await colorModel.find().skip(skip).limit(limit)
    let totDat = await colorModel.find()
    let obj = {
        sataus: 1,
        msg: "success",
        data,
        totPage:Math.ceil(totDat.length/limit)
    }
    res.send(obj)
}

let colorDelete = async (req, res) => {
    let { id } = req.params;
    let delRes = await colorModel.deleteOne({ _id: id })
    let obj = {
        status: 1,
        msg: "suucess",
        delRes
    }

    res.send(obj)
}

let colorDeleteMulti = (req, res) => {
    let { ids } = req.body

    colorModel.deleteMany({ _id: ids })
        .then((resData) => {
            obj = {
                status: 1,
                msg: "success",
                resData,
                ids
            }

            res.send(obj)
        })
        .catch((err) => {
            obj = {
                status: 0,
                msg: "failed",
                err
            }

            res.send(obj)
        })
}

let colorDetail = (req, res) => {
    let { id } = req.params
    let obj
    colorModel.findOne({ _id: id })
        .then((resData) => {
            obj = {
                status: 1,
                msg: "success",
                resData
            }
            res.send(obj)
        })
        .catch((err) => {
            obj = {
                status: 1,
                msg: "Data Not Found",
                err
            }
            res.send(obj)
        })
}


// let colorDetail = async (req, res) => {
//     let {id} = req.params
//     let dataRes = await colorModel.findOne({_id: id})
//     let obj = {
//         status:1,
//         msg:"success",
//         dataRes
//     }

//     res.send(obj)
// }

let colorUpdate = async (req, res) => {
    let { id } = req.params
    let updateRes = await colorModel.updateOne(
        { _id: id },
        {
            $set: req.body
        }
    )

    let obj = {
        status: 1,
        msg: "success",
        updateRes
    }


    res.send(obj)
}

let statusUpdate = async (req, res) => {
    let { ids } = req.body
    let updResArr = [];
    for (let id of ids) {
        let currStatus = await colorModel.findOne({ _id: id })
        let status = currStatus.colorStatus
        updRes = await colorModel.updateOne(
            {_id:id},
            {
                $set:{colorStatus:!status}
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

module.exports = { colorCreate, colorView, colorDelete, colorDeleteMulti, colorDetail, colorUpdate, statusUpdate }