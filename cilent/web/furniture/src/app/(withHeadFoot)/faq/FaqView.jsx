"use client"
import React, { useState } from 'react'

export default function FaqView() {

    let [tab, setTab] = useState(0)

    return (
        <div className='max-w-[1320px] mx-auto my-5'>
            <div className='border border-[#eee] my-2'>
                <div className='bg-gray-600 text-white w-full py-2 px-2 flex justify-between'>
                    <button >1. Mauris congue euismod purus at semper. Morbi et vulputate massa?</button>
                    <div className='font-bold text-2xl cursor-pointer' onClick={() => setTab(tab == 1 ? 0 : 1)}>+</div>
                </div>
                <div className={`px-2  ${tab == 1 ? '' : 'hidden'}`}>1. Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</div>
            </div>

            <div className='border border-[#eee] my-2'>
                <div className='bg-gray-600 text-white w-full py-2 px-2 flex justify-between'>
                    <button >2. Mauris congue euismod purus at semper. Morbi et vulputate massa?</button>
                    <div className='font-bold text-2xl cursor-pointer' onClick={() => setTab(tab == 2 ? 0 : 2)}>+</div>
                </div>
                <div className={`px-2 ${tab == 2 ? '' : 'hidden'}`}>2. Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</div>
            </div>
        </div>
    )
}
