const orderModel = require("../../models/orderModels");

let saveOrder=async (req,res)=>{
   let orderObj={...req.body}
   
   let {id,...orData}=orderObj
   console.log(id,orData);
   
    if(orData.paymentMethod==1){
        //COD
        orData['orderStatus']="process"
        orData['userId']=id
        let order=await orderModel(orData)
        await order.save()
        
    }
    else{
        //Online payment
    }
    res.send("hello")
}

module.exports={saveOrder}