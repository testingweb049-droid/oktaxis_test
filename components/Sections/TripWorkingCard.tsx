import { homePageData } from "@/constants/homePageData";
import Image from "next/image";

interface TripWorking {
    title: string
    description: any
    image: string
}

const TripWorking = () => {
    const { tripWorking  } = homePageData;
    return(
        <div className="full-width-section flex flex-col items-center m-auto justify-center  gap-x-5 md:gap-y-4  px-[2%] py-12 md:py-16 lg:py-20">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold">{tripWorking.title}</h1>
                <p className="text-[16px] font-medium text-gray-500 text-center px-8 lg:px-52 py-4">{tripWorking.description}</p>
            </div>
            <div className="flex flex-col items-center lg:flex-row ">
                {tripWorking.contents.map((content, index) => (
                    <div 
                        key={index}
                        className="flex flex-col gap-y-4 p-4 items-center justify-evenly hover:bg-white hover:shadow-lg hover:transition-all hover:rounded-md"
                    >
                        <Image
                            src={content.backgroundImage}
                            alt="Serive Image"
                            className="w-48 h-48 object-cover"
                        />
                        <h1 className="text-xl text-gray-950 font-semibold">{content.title}</h1>
                        <p className="text-sm text-gray-400 text-center">{content.description}</p>

                    </div>

                ))}
            </div>
        </div>
    )
}

export default TripWorking;