'use client'
import React from 'react'
import useFormStore from '@/stores/form-store'

function CategoryTabs() {
  const { category, changeCategory } = useFormStore()

  return (
    <div className='grid grid-cols-2 gap-3 max-lg:px-4 sm:px-0'>
      <div
        onClick={() => changeCategory('trip')}
        className={`py-2 px-3 w-full text-center font-semibold rounded-xl cursor-pointer transition-colors ${
          category === 'trip'
            ? 'bg-brand text-black'
            : 'bg-white text-gray-700 border border-gray-300'
        }`}
      >
        One Way
      </div>
      <div
        onClick={() => changeCategory('hourly')}
        className={`py-2 px-3 w-full text-center font-semibold rounded-xl cursor-pointer transition-colors ${
          category === 'hourly'
            ? 'bg-brand text-black'
            : 'bg-white text-gray-700 border border-gray-300'
        }`}
      >
        Hourly
      </div>
    </div>
  )
}

export default CategoryTabs

