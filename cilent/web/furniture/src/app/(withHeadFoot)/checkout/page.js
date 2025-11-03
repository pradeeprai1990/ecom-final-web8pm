"use client";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useRazorpay } from "react-razorpay";

export default function Checkout() {
  let { Razorpay } = useRazorpay();
  let [paymenttype, setPaymentType] = useState(0);

  let cartData = useSelector((store) => store.myCart.cart);
  let [ShippingAddres, setShippingAddres] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    address: "",
    postalCode: "",
  });

  let cart = cartData.map((obj) => {
    return {
      productImg: obj.productImg,
      productPrice: obj.productPrice,
      title: obj.title,
      category: obj.category.categoryName,
      productQty: obj.productQty,
    };
  });

  let orderAmount = cartData.reduce(
    (t, obj) => (t += obj.productPrice * obj.productQty),
    0
  );

  let totQty = cartData.reduce((t, obj) => (t += obj.productQty), 0);

  let getValueSetvalue = (e) => {
    let obj = { ...ShippingAddres };
    obj[e.target.name] = e.target.value;
    setShippingAddres(obj);
  };
  let token = useSelector((store) => store.user.token);

  let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL;
  let saveOrder = (e) => {
    e.preventDefault();
    console.log(ShippingAddres);
    console.log(paymenttype);
    console.log(cart);
    console.log(orderAmount);
    console.log(totQty);
    let orderObj = {
      orderItems: cart,
      shippingAddess: ShippingAddres,
      paymentMethod: paymenttype,
      orderAmount: orderAmount,
      orderQty: totQty,
    };
    axios
      .post(`${apiBaseurl}order/order-save`, orderObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((apiRes) => apiRes.data)
      .then((finaldata) => {
        if (paymenttype == 1) {
          console.log(finaldata);
        } else {
         

          const RazorpayOrderOptions = {
            key: "rzp_test_WAft3lA6ly3OBc",
            amount: finaldata.amount, // Amount in paise
            currency: "INR",
            name: "WsCubeTech",
            description: "WsCubeTech Transaction",
            order_id:finaldata.id, // Generate order_id on server
            handler: (response) => {

              console.log(response);
              alert("Payment Successful!");


            },
            prefill: {
              name: "John Doe",
              email: "john.doe@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#F37254",
            },
          };

          console.log(RazorpayOrderOptions);
          
          const razorpayInstance = new Razorpay(RazorpayOrderOptions);
          razorpayInstance.open();

        }
      });
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={saveOrder}>
        <div className=" max-w-[1320px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="p-2 border rounded"
                  onChange={getValueSetvalue}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="p-2 border rounded"
                  onChange={getValueSetvalue}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                onChange={getValueSetvalue}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-2 border rounded"
                onChange={getValueSetvalue}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="p-2 border rounded"
                  onChange={getValueSetvalue}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="p-2 border rounded"
                  onChange={getValueSetvalue}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Payment Method</h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      className="mr-2"
                      onChange={() => setPaymentType(1)}
                    />
                    COD
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      className="mr-2"
                      onChange={() => setPaymentType(2)}
                    />
                    Online
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t pt-4 font-bold flex justify-between">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
