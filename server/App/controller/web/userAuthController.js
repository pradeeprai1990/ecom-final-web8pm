const { transporter } = require("../../config/mailConfig");
const bcrypt = require('bcrypt');
const { userAuthModel } = require("../../models/userAuthModel");
const { adminAuthModel } = require("../../models/adminAuthModel");
const { contactUsModel } = require("../../models/contactUsModel");
const saltRounds = 10;
let jwt = require('jsonwebtoken');

let usersOtp = new Map()
let userOtp = async (req, res) => {
    let { userEmail } = req.body
    let otp = Number((Math.random() * 9999999).toString().split(".")[0].slice(0, 4))
    usersOtp.set('myOtp', otp)
    const info = await transporter.sendMail({
        from: '"MONSTA" <alamsayeeed42@gmail.com>',
        to: userEmail,
        subject: "MONSTA | OTP",
        text: "OTP", // plain‑text body
        html: `<b>OTP-${otp}</b>`, // HTML body
    });

    let obj = {
        status: 1,
        data: req.body,
        otp
    }

    res.send(obj)
}

let userCreate = async (req, res) => {
    let { userName, userEmail, userPhone, userPassword, otp } = req.body
    let myOtp = usersOtp.get('myOtp')
    let obj

    if (otp == myOtp) {
        try {
            const hash = bcrypt.hashSync(userPassword, saltRounds);
            let userCreateObj = {
                userName,
                userEmail,
                userPhone,
                userPassword: hash
            }

            let userCollection = await userAuthModel(userCreateObj)
            let insRes = await userCollection.save()
            obj = {
                status: 1,
                msg: "User Created Successfully..!",
                insRes
            }
        } catch (err) {
            if (err.errorResponse.code == 11000) {
                obj = {
                    status: 0,
                    msg: "User Already Exist..!"
                }
            }
        }
    } else {
        obj = {
            status: 0,
            msg: "Kindly Enter Correct Otp.",
        }
    }

    res.send(obj)
}

let userLogin = async (req, res) => {
    let { userEmail, userPassword } = req.body
    let user = await userAuthModel.findOne({ userEmail })
    let userObj
    if (user) {
        let password = await user.userPassword
        if (bcrypt.compareSync(userPassword, password)) {
            let token = jwt.sign({ id: user._id }, process.env.TOKENKEY);
            userObj = {
                status: 1,
                msg: "Login Successfully..!",
                user,
                token
            }

        } else {
            userObj = {
                status: 0,
                msg: "User Password Is Incorrect..!"
            }
        }
    } else {
        userObj = {
            status: 0,
            msg: "User Email Is Incorrect..!"
        }
    }

    res.send(userObj)
}

let adminContactDetails = async (req, res) => {
    let data = await adminAuthModel.findOne()
    let obj = {
        status: 1,
        data
    }
    res.send(obj)
}

let userContactUsDataSave = async (req, res) => {
    let { email, message } = req.body
    let adminCollection = await adminAuthModel.find()
    let adminEmail = await adminCollection[0].email

    let contactUsCollection = await contactUsModel(req.body)
    let insRes = await contactUsCollection.save()
    const info = await transporter.sendMail({
        from: `"MONSTA" <${email}>`,
        to: adminEmail,
        subject: "MONSTA | CONTACT-US",
        text: "Contact-Us", // plain‑text body
        html: `<b>Message-${message}</b>`, // HTML body
    });


    let obj = {
        status: 1,
        msg: "Insert Successfully..!",
        insRes
    }

    res.send(obj)
}

let userGoogleLogin = async (req, res) => {
    let { userEmail, userName } = req.body

    let chkEmail = await userAuthModel.findOne({ userEmail: userEmail })
    let obj
    if (chkEmail) {
        let token = jwt.sign({ id: chkEmail._id }, process.env.TOKENKEY);
        obj = {
            status: 0,
            msg: "Already Exist..!",
            data: chkEmail,
            token
        }
    } else {
        let insObj = {
            userName: userName,
            userEmail: userEmail,
            userPhone: "",
            userPassword: ""
        }
        let userCollectons = await userAuthModel(insObj)
        let insRes = await userCollectons.save()
        let token = jwt.sign({ id: insRes._id }, process.env.TOKENKEY);
        obj = {
            status: 1,
            msg: "Added Successfully..!",
            data: insRes,
            token
        }
    }

    res.send(obj)
}

let userChangePassword = async (req, res) => {
    let { id, cur_password, new_password, cnf_password } = req.body
    let chkPassword = await userAuthModel.findOne({ _id: id }).select('userPassword')
    let userPassword = await chkPassword.userPassword
    let obj
    if (bcrypt.compareSync(cur_password, userPassword)) {
        if (new_password == cnf_password) {
            const hash = bcrypt.hashSync(new_password, saltRounds)
            let upd = await userAuthModel.updateOne(
                {_id:id},
                {
                    $set:{userPassword:hash}
                }
            )

            obj = {
                status:1,
                msg:"Password Change Successfully..!",
                upd
            }

        } else {
            obj = {
                status: 0,
                msg: "New Password and Confirm Password is not matched..!"
            }
        }

    } else {
        obj = {
            status: 0,
            msg: "Current Password is invalid..!"
        }
    }

    res.send(obj)
}

let saveProfileBilling = async (req, res)=>{
    let {id} = req.body
    
    let updObj = {
        billingName:req.body.billingName,
        billingEmail:req.body.billingEmail,
        billingMobNo:req.body.billingMobNo,
        billingAddress:req.body.billingAddress,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        city:req.body.city,
    }
    let updRes = await userAuthModel.updateOne(
        {_id:id},
        {
            $set:{
                billingAddrerss:updObj
            }
        }
    )

    let obj = {
        status:1,
        msg:"Updated Billing Address..!",
        updRes
    }
    res.send(obj)
}

let saveProfileShipping = async (req, res)=>{
    let {id} = req.body
    let updObj = {
        shippingName:req.body.shippingName,
        shippingEmail:req.body.shippingEmail,
        shippingMobNo:req.body.shippingMobNo,
        shippingAddress:req.body.shippingAddress,
        shippingCountry:req.body.shippingCountry,
        shippingState:req.body.shippingState,
        shippingCity:req.body.shippingCity
    }
    let updRes = await userAuthModel.updateOne(
        {_id:id},
        {
            $set:{
                shippingAddress:updObj
            }
        }
    )
    let obj = {
        status:1,
        msg:"Updated Shipping Address..!",
        updRes
    }
    res.send(obj)
}

let profileView = async (req, res) => {
    let {id} = req.body
    let data = await userAuthModel.findOne({_id:id}).select('billingAddrerss shippingAddress')
    let obj = {
        status:1,
        data
    }

    res.send(obj)
}


module.exports = { userOtp, userCreate, userLogin, adminContactDetails, userContactUsDataSave, userGoogleLogin, userChangePassword, saveProfileBilling, saveProfileShipping, profileView}