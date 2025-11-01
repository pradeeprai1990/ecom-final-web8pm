const { cartModel } = require("../../models/cartModel")

let addToCart = async (req, res) => {
    //console.log(req.body);
    let { id, pid, category, title, img, qty, price } = req.body
    let userId = id
    let cartObj = {
        productId: pid,
        productQty: qty,
        productImg: img,
        productPrice: price,
        category,
        title,
        userId
    }

    let cartCollection = await cartModel(cartObj)
    let insRes = await cartCollection.save()
    let obj = {
        status: 1,
        msg: "Added Successfully..!",
        insRes
    }

    res.send(obj)
}

let cartView = async (req, res) => {
    let {id} = req.body
    console.log(id);
    
    let data = await cartModel.find({userId:id}).populate('category','categoryName')
    let obj = {
        status:1,
        data
    }
    //console.log(req.body);
    
    res.send(obj)
}


let deleteCart = async (req, res) => {
    let {cartId} = req.body //{cartId}

    
    let data = await cartModel.deleteOne({_id:cartId})
    let obj = {
        status:1,
        data
    }
    //console.log(req.body);
    
    res.send(obj)
}


module.exports = { addToCart, cartView,deleteCart }