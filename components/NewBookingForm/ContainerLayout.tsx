import React, { ReactNode } from 'react'

function FullWidthSectionLayout({children}:{children:ReactNode}) {
  return (
    <div className='w-full max-w-screen-2xl px-3 lg:px-5 mx-auto'>
        {children}
    </div>
  )
}

export default FullWidthSectionLayout