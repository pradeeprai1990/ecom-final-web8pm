const { adminAuthModel } = require("../../models/adminAuthModel")

let adminAuthLoginCreate = async (req, res) => {

    let dataObj = { ...req.body }
    if (req.body) {
        dataObj["password"] = "admin@123"
    }
    if (req.file) {
        dataObj["profileImg"] = req.file.filename
    }


    let adminCntData = await adminAuthModel.find()
    if (adminCntData.length == 0) {
        let adminCollections = await adminAuthModel(dataObj)
        let insRes = await adminCollections.save()
        let obj = {
            status: 1,
            msg: "Inserted Successfully..!",
            insRes
        }
        res.send(obj)
    } else {
        let updRes = await adminAuthModel.updateOne(
            {
                $set: dataObj
            }
        )
        let obj = {
            status: 1,
            msg: "Update Successfully..!",
            updRes
        }
        res.send(obj)
    }
}

let adminProfileView = async (req, res) => {
    let data = await adminAuthModel.find()
    if (data.length > 0) {
        let obj = {
            status: 1,
            staticPath:process.env.ADMINPROFILE,
            data
        }
        res.send(obj)
    }else{
        let obj = {
            status: 0,
            msg:"Data Not Found..!"
        }
        res.send(obj)
    }

}

let adminAuthLogin = async (req, res) => {
    let { email, password } = req.body
    console.log(req.body);
    
    let chkCredential = await adminAuthModel.findOne({ email, password })
    let obj;
    if (chkCredential) {
        obj = {
            status: 1,
            msg: "Login Successfully..!",
            chkCredential,
        }
    } else {
        obj = {
            status: 0,
            msg: "Login Failed..!",
            chkCredential,

        }
    }

    res.send(obj)
}

let adminChkId = async (req, res) => {
    try {
        let { id } = req.params
        let chkId = await adminAuthModel.findOne({ _id: id })
        let obj
        if (chkId) {
            obj = {
                status: 1,
                id
            }
        } else {
            obj = {
                status: 0,
                msg: "Invalid id"
            }
        }
        res.send(obj)
    } catch (err) {
        obj = {
            status: 0,
            err
        }
        res.send(obj)
    }

}

module.exports = { adminAuthLoginCreate, adminProfileView, adminAuthLogin, adminChkId }