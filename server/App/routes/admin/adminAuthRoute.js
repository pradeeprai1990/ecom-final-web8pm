let express = require("express")
const { adminAuthLogin, adminChkId, adminAuthLoginCreate, adminProfileView } = require("../../controller/admin/adminAuthController")
const multer = require("multer")
let adminAuthRoutes = express.Router()

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,"uploads/admin-profile")
    },
    filename:function(req, file, cb){
        cb(null, Date.now()+'_'+file.originalname)
    }
})

let uploads = multer({storage:storage})

adminAuthRoutes.post('/login', uploads.none() ,adminAuthLogin)
adminAuthRoutes.post('/create', uploads.single('profileImg') ,adminAuthLoginCreate)
adminAuthRoutes.get('/check-id/:id',adminChkId)
adminAuthRoutes.get('/view', adminProfileView)

module.exports = {adminAuthRoutes}