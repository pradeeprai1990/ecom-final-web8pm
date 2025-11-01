import React, { useState } from 'react'
import { RiDashboard3Line } from "react-icons/ri";
import { FaUserAlt, FaRegDotCircle, FaSlidersH, FaUserEdit } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosColorPalette } from "react-icons/io";
import { MdGasMeter } from "react-icons/md";
import { FaMessage, FaBagShopping, FaClockRotateLeft, FaQ } from "react-icons/fa6";
import { VscThreeBars } from "react-icons/vsc";
import { MdEditNote } from "react-icons/md";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { Link } from 'react-router';

export default function Sidebar() {

  let [dmenu, setDmenu] = useState(0)

  return (
    <div className='border-1 h-screen overflow-y-scroll bg-[#1f2937] text-white fixed'>
      <figure className='py-3 border-b-1 bg-gray-400'>
        <img className="mx-auto w-[50%]" src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" alt="logo" />
      </figure>
      <Link to={'/dashboard'} className='flex items-center gap-2 p-3 font-bold'>
        <RiDashboard3Line /> Dashboard
      </Link>
      <ul className='p-3 space-y-3'>
        <li>
          <Link onClick={() => setDmenu(dmenu == 1 ? 0 : 1)} className='flex items-center gap-2 text-1xl font-bold'><FaUserAlt /> Users <span className='ml-auto'>{dmenu == 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 1 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/user'} className='flex items-center gap-2'><FaRegDotCircle /> View User </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 2 ? 0 : 2)} className='flex items-center gap-2 text-1xl font-bold'><FaMessage /> Enquires <span className='ml-auto'>{dmenu == 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 2 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/enquiry'} className='flex items-center gap-2'><FaRegDotCircle /> Contact Enqury </Link></li>
            <li className='ml-3 mt-3'><Link to={'/newsletter'} className='flex items-center gap-2'><FaRegDotCircle /> Newsletter </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 3 ? 0 : 3)} className='flex items-center gap-2 text-1xl font-bold'><IoIosColorPalette /> Colors <span className='ml-auto'>{dmenu == 3 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 3 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/color/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Color </Link></li>
            <li className='ml-3 mt-3'><Link to={'/color/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Color </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 4 ? 0 : 4)} className='flex items-center gap-2 text-1xl font-bold'><MdGasMeter /> Meterials <span className='ml-auto'>{dmenu == 4 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 4 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/material/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Meterial </Link></li>
            <li className='ml-3 mt-3'><Link to={'/material/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Meterial </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 5 ? 0 : 5)} className='flex items-center gap-2 text-1xl font-bold'><VscThreeBars /> Parent Categories <span className='ml-auto'>{dmenu == 5 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 5 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/category/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Category </Link></li>
            <li className='ml-3 mt-3'><Link to={'/category/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Category </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 6 ? 0 : 6)} className='flex items-center gap-2 text-1xl font-bold'><VscThreeBars /> Sub Categories <span className='ml-auto'>{dmenu == 6 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 6 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/category/sub-category/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Sub Category </Link></li>
            <li className='ml-3 mt-3'><Link to={'/category/sub-category/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Sub Category </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 7 ? 0 : 7)} className='flex items-center gap-2 text-1xl font-bold'><VscThreeBars /> Sub Sub Categories <span className='ml-auto'>{dmenu == 7 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 7 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/category/sub-sub-category/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Sub Sub Category </Link></li>
            <li className='ml-3 mt-3'><Link to={'/category/sub-sub-category/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Sub Sub Category </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 8 ? 0 : 8)} className='flex items-center gap-2 text-1xl font-bold'><FaBagShopping /> Products <span className='ml-auto'>{dmenu == 8 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 8 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/product/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Product </Link></li>
            <li className='ml-3 mt-3'><Link to={'/product/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Product </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 9 ? 0 : 9)} className='flex items-center gap-2 text-1xl font-bold'><FaClockRotateLeft /> Why Choose Us <span className='ml-auto'>{dmenu == 9 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 9 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/why-choose-us/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Why Choose Us </Link></li>
            <li className='ml-3 mt-3'><Link to={'/why-choose-us/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Why Choose Us </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 10 ? 0 : 10)} className='flex items-center gap-2 text-1xl font-bold'><MdEditNote /> Orders <span className='ml-auto'>{dmenu == 10 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 10 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/orders/orders'} className='flex items-center gap-2'><FaRegDotCircle /> Orders </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 11 ? 0 : 11)} className='flex items-center gap-2 text-1xl font-bold'><FaSlidersH /> Sliders <span className='ml-auto'>{dmenu == 11 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 11 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/slider/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Slider </Link></li>
            <li className='ml-3 mt-3'><Link to={'/slider/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Slider </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 12 ? 0 : 12)} className='flex items-center gap-2 text-1xl font-bold'><IoPaperPlaneOutline /> Country <span className='ml-auto'>{dmenu == 12 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 12 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/country/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Country </Link></li>
            <li className='ml-3 mt-3'><Link to={'/country/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Country </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 13 ? 0 : 13)} className='flex items-center gap-2 text-1xl font-bold'><FaUserEdit /> Testimonials <span className='ml-auto'>{dmenu == 13 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 13 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/testimonial/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Testimonial </Link></li>
            <li className='ml-3 mt-3'><Link to={'/testimonial/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Testimonial </Link></li>
          </ul>
        </li>

        <li>
          <Link onClick={() => setDmenu(dmenu == 14 ? 0 : 14)} className='flex items-center gap-2 text-1xl font-bold'><FaQ /> Faqs <span className='ml-auto'>{dmenu == 14 ? <IoIosArrowUp /> : <IoIosArrowDown />}</span> </Link>
          <ul className={`${dmenu == 14 ? '' : 'hidden'}`}>
            <li className='ml-3 mt-3'><Link to={'/faq/add'} className='flex items-center gap-2'><FaRegDotCircle /> Add Faq </Link></li>
            <li className='ml-3 mt-3'><Link to={'/faq/view'} className='flex items-center gap-2'><FaRegDotCircle /> View Faq </Link></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
