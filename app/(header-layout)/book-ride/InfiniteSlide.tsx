import Image from 'next/image'
import React from 'react'
import yearsImage from "@/assets/new-form/gray10years.png"

const list = [
    {
      image: yearsImage,
      text: 'Everywhere in England'
    },
    {
      image: yearsImage,
      text: '1200+ taxi chauffeurs'
    },
    {
      image: yearsImage,
      text: 'More than 150K taxi trips per year'
    },
]

function InfiniteSlide() {

    return <div className="overflow-hidden flex">
          <div className="flex items-center animate-infinite-slide px-2 py-4">
            { [...list, ...list, ...list, ...list].map((item)=>{
              return <div key={item.text} className="flex items-center text-gray-700 text-xl font-medium " >
                <div className="pl-8 pr-4 w-24" >
                <Image src={item.image} alt={item.text} className="w-12"/>
                </div>
                <p className="text-nowrap">{item.text}</p>
              </div>
            })

            }
          </div>
        </div>

}

export default InfiniteSlide