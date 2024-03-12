'use client'
import React, { useState } from 'react'

export default function FilterCard({ toggleNav }) {

  const [category, setCategory] = useState([{
    id: "Analytics",
    check: false
  }, {
    id: "File Management",
    check: false
  }, {
    id: "Design",
    check: false
  }, {
    id: "Content",
    check: false
  }, {
    id: "Productivity",
    check: false
  }, {
    id: "Email Marketing",
    check: false
  }, {
    id: "SEO",
    check: false
  },
  {
    id: "Customer Support",
    check: false
  },
  {
    id: "Social Media",
    check: false
  }])
  return (
    <div
    id="exclude-blur"
   
      className={` ${toggleNav ? "block" : "hidden"
        } bg-[#fff] customFont   border  p-7 border-[#E3E3E3] flex flex-col items-start md:w-[413px] mt-1 sm:mr-0 sm:w-[205px] z-10     text-[15px] justify-center rounded-[16px]    absolute shadow-md`}
    >
      <div className="flex flex-col  w-full">
        <div className=' flex flex-row justify-between items-center'>
          <div className='font-semibold text-[16px]'>
            Filter
          </div>
          <div className='text-[#2665F8] font-semibold text-sm '>
            Reset
          </div>

        </div>

        <div className='flex gap-4 items-center my-3'>
          <div className='gap-2 flex items-center'>
            <input
              className='text-[#636363]'
              type='checkbox'
            />
            <label className='text-[#636363] text-sm font-medium'>
              Deals
            </label>
          </div>
          <div className='gap-2 flex items-center'>
            <input
              className='text-[#636363]'
              type='checkbox'
            />
            <label className='text-[#636363] text-sm font-medium'>
              Trends
            </label>
          </div>
        </div>

        <div className='font-semibold text-[16px] my-1'>
          Categories
        </div>
        <div className='grid grid-cols-2 gap-4 items-center my-3'>
          {category.map((obj, index) => (
            <div key={index} className='flex gap-2 items-center'>
              <input
                className='text-[#636363]'
                type='checkbox'
                checked={obj.check}
                onChange={() => {
                  const updatedCategory = [...category];
                  updatedCategory[index].check = !updatedCategory[index].check;
                  setCategory(updatedCategory);
                }}
              />
              <label className='text-[#636363] text-sm font-medium'>
                {obj.id}
              </label>
            </div>
          ))}


        </div>

        <div className='font-semibold text-[16px] my-1'>
          Sort by
        </div>


        <div className='flex gap-4 items-center my-3'>
          <div className='gap-2 flex items-center'>
            <input
              className='text-[#636363]'
              type='radio'
            />
            <label className='text-[#636363] text-sm font-medium'>
              Rating
            </label>
          </div>
          <div className='gap-2 flex items-center'>
            <input
              className='text-[#636363]'
              type='radio'
            />
            <label className='text-[#636363] text-sm font-medium'>
              A-Z
            </label>
          </div>
          <div className='gap-2 flex items-center'>
            <input
              className='text-[#636363]'
              type='radio'
            />
            <label className='text-[#636363] text-sm font-medium'>
              Z-A
            </label>
          </div>
        </div>

        <div>
        <button className=" bg-black p-2 px-4 w-full font-bold text-[16px] text-white rounded-3xl">
              Apply
            </button>
        </div>

        <div>

        </div>

      </div>


    </div>
  )
}
