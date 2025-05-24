import React from 'react'
import SuccessComponent from './SuccessComponent'

function page({params}:{params:{id:string}}) {
  const id = params.id
  return (
    <div className='w-full h-full'>
      <SuccessComponent orderId={id} />
    </div>
  )
}

export default page