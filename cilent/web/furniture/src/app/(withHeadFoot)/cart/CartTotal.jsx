import React from 'react'

export default function CartTotal() {
  return (
    <div className='max-w-[1320px] mx-auto py-5 grid grid-cols-2 gap-3'>
      <div className='w-[100%] border-1 border-[#eee] h-[200px]'>
        <div className='bg-black text-white py-3 p-2'>COUPON</div>
        <div className='p-5'>
          <p>Enter your coupon code if you have one.</p>
          <div className='flex gap-2'>
            <input type="text" placeholder='Coupon Code' className='p-1 my-2 py-2 border-1 border-[#eee]' />
            <button className='p-1 bg-black text-white rounded h-[40px] my-2 px-2'>APPLY COUPON</button>
          </div>
        </div>
      </div>

      <div>
        <div className='w-[100%] border-1 border-[#eee] h-[200px]'>
          <div className='bg-black text-white py-3 p-2'>CART TOTALS</div>
          <div className='p-5 flex justify-between'>
            <div>Subtotal</div>
            <div>Rs. 2,900</div>
          </div>
          <div className='px-5 py-2 flex justify-between'>
            <div>Discount (-)</div>
            <div>Rs. 0</div>
          </div>
          <div className='px-5 py-2 flex justify-between'>
            <div><b>Total</b></div>
            <div><b>Rs. 2,900</b></div>
          </div>
        </div>
      </div>
    </div>
  )
}
