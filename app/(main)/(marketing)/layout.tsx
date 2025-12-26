// import Image from 'next/image'
import React, { ReactNode } from 'react'
// import Whatsapp from "@/assets/whatsapp.png";

function layout({children}:{children:ReactNode}) {
  return (
    <div className='w-full'>{children}
    {/* <div className="fixed right-[0] bottom-[4%] animate-whatsappBounce z-50">
          <a href="https://wa.me/447342193341" target="_blank" rel="noopener noreferrer">
            <Image
              src={Whatsapp}
              alt="whatsapp logo"
              className="w-14 lg:w-16 pr-[2px] lg:p-0"
            />
          </a>
        </div> */}
    </div>
  )
}

export default layout