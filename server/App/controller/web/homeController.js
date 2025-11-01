const { categoryModel } = require("../../models/categoryModel");
const { productModel } = require("../../models/productModel");
const { sliderModel } = require("../../models/sliderModel");

let getHomeCategory = async (req, res) => {
    let data = await categoryModel.find().select('categoryName')
    let obj = {
        status:1,
        data
    }
    res.send(obj);
}

let getProductByCategory = async (req, res) => {
    let {pid} = req.params
    let data = await productModel.find({parentCategory:pid,status:true}).populate("parentCategory","categoryName")
    let obj = {
        imgPath:process.env.PRODUCTPATH,
        status:1,
        data
    }
    res.send(obj)
}

let getSlider  = async (req, res) => {
    let data = await sliderModel.find({sliderStatus:true}).select("sliderImg")
    let obj = {
        imgPath:process.env.SLIDERIMGPATH,
        status:1,
        data
    }

    res.send(obj)
}

let getBestSellingProduct = async (req, res) => {
    let datas = await productModel.find({status:true,bestSelling:1}).populate("parentCategory","categoryName")
    let obj = {
       status:1,
       imgPath:process.env.PRODUCTPATH,
       datas 
    }

    res.send(obj)
}

module.exports= {getHomeCategory, getProductByCategory, getSlider, getBestSellingProduct}