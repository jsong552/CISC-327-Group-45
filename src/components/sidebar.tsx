
/**
 * Represents the Sidebar component.
 * This component displays a sidebar with shorcut to the different pages in our environment.
 */


import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


export default function Sidebar() {
    var currDate = new Date().toLocaleDateString();
    var currTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    const navigate = useNavigate();

    const location = useLocation();
    const pathname = location.pathname;
    

  return (
    <div className='border border-black w-fit'>
         <body className="bg-[#283342]">
    <div
      className="sidebar fixed top-16 bottom-0 lg:left-0 p-2 w-1/5 overflow-y-auto text-center bg-[#283342]"
    >
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <img src="/user_prof.svg" alt="image"/>
          <div className='pt-4'>
          <p className="text-gray-200 text-[20px] text-left ml-6">Adwait <br/></p>    
          <p className='text-yellow-300 text-[15px] ml-6'>Administrator</p>
          </div>
          
        </div>
        <div className="my-2 bg-white h-[1px]"></div>
      </div>
      <div
        className={`p-5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${pathname === "/dashboard" ? "bg-[#37939a]" : ""} hover:bg-blue-500 text-white`}
        onClick={() => navigate("/dashboard")}
      >
       <img src="/vector.svg" className="h-7 w-7"alt="image"/>

        <span className="text-[20px] ml-4 text-gray-200 font-semibold">Dashboard</span>
      </div>
      <div
        className={`p-5 mt-3 mb-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${pathname === "/inventory" ? "bg-[#37939a]" : ""} hover:bg-blue-500 text-white`}
        onClick={() => navigate("/inventory")}
      >
       <img src="/inventory.svg" className="h-7 w-7"alt="image"/>

        <span className="text-[20px] ml-4 text-gray-200 font-semibold">Inventory</span>
      </div>
      <div
        className={`p-5 mt-3 mb-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${pathname === "/addmedicine" ? "bg-[#37939a]" : ""} hover:bg-blue-500 text-white`}
        onClick={() => navigate("/addmedicine")}
      >
       <img src="/medicine.svg" className="h-7 w-7"alt="image"/>

        <span className="text-[20px] ml-4 text-gray-200 font-semibold">Add Medicine</span>
      </div>


      <div
        className={`p-5 mt-3 mb-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${pathname === "/sales" ? "bg-[#37939a]" : ""} hover:bg-blue-500 text-white`}
        onClick={() => navigate("/sales")}
      >
       <img src="/sales.svg" className="h-8 w-8"alt="image"/>

        <span className="text-[20px] ml-4 text-gray-200 font-semibold">View Sales</span>
      </div>
      <div
        className={`p-5 mt-3 mb-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${pathname === "/order" ? "bg-[#37939a]" : ""} hover:bg-blue-500 text-white`}
        onClick={() => navigate("/order")}
      >
       <img src="/plusIcon.svg" className="h-8 w-8"alt="image"/>

        <span className="text-[20px] ml-4 text-gray-200 font-semibold">Make Order</span>
      </div>

      <div className="my-4 bg-white h-[1px]"></div>

      <div
        className="p-2.5 mt-3 mb-2 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white"
      >
        <img src="/clock.svg" alt="image"/>
        <p className='pl-4 text-[18px] text-white font-bold'> {currTime} </p>
        
      </div>
      <div
        className="p-2.5 mt-3 mb-2 flex items-center rounded-md px-4 duration-300 text-white"
      >
        
        <img src="/calendar.svg" alt="image"/>
        <p className='pl-4 text-[18px] text-white font-bold'> {currDate} </p> 
        
      </div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300hover:bg-blue-600 text-white"
      >
        <i className="bi bi-box-arrow-in-right"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
      </div>
    </div>

  </body>


    </div>
  )
}
