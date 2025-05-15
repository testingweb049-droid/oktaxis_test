import { homePageData } from "@/constants/homePageData";
import Image from "next/image";
import Link from "next/link";


export default function VehicleGrid() {
    const { bgImg, serviceName, title, fleet } = homePageData.ourFleets || [];

    return (
        <>
            <div
                className="w-full h-[60vh] lg:h-[80vh] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `url('${bgImg.src}')`
                }}

            >
            </div>
            <div className="flex flex-col gap-6 px-4 py-6 bg-gradient-to-r from-teal-100 to-green-50 rounded-lg shadow-lg transition-all ease-in-out duration-300 transform ">

                <h2 className="text-brand text-4xl md:text-6xl font-bold text-center tracking-wide leading-tight text-shadow-lg transition-all duration-500 transform hover:translate-y-1">{title}</h2>

                <p className="text-gray-800 mx-auto text-lg md:text-xl mt-4 max-w-screen-lg text-center opacity-90 transition-opacity duration-300 hover:opacity-100">
                    At {serviceName}, we take pride in offering a diverse fleet of vehicles designed to meet the needs of every traveler. Whether you're seeking affordability, luxury, or room for a group, our meticulously maintained cars ensure a safe and comfortable ride.
                </p>

                <div className="max-w-screen-lg mx-auto w-full px-4 py-5 flex justify-center">
                    <Link href='/booking' className="px-10 py-3 font-semibold rounded-lg bg-gradient-to-r from-brand to-teal-700 hover:from-brand hover:to-teal-600 text-white transition-all ease-in-out duration-300 transform hover:scale-105 hover:shadow-lg">
                        Book Now
                    </Link>
                </div>
            </div>
            <div className="w-full bg-gray-100 py-8 px-4">
                <div className="container mx-auto   flex flex-col gap-3 max-w-screen-lg">
                    <div className="text-brand font-bold text-3xl" >Economy Class</div>
                    <div className="text-gray-700 text-lg max-w-screen-lg " >Perfect for budget-conscious travelers, our Economy Class vehicles provide exceptional value without compromising on comfort. These reliable and fuel-efficient cars are ideal for solo passengers or small groups.</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {fleet.filter((item) => { if (item.class === 'economy') { return true } }).map((fleet, index) => (
                            <div
                                key={index}
                                className="block group"
                            >
                                <div className="bg-white border border-gray-200 rounded-sm p-8 transition-shadow hover:shadow-lg">
                                    <div className="relative h-48 mb-6">
                                        <Image
                                            src={fleet.image}
                                            alt={fleet.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl text-brand font-medium relative inline-block">
                                            {fleet.name}
                                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand transform scale-x-0 transition-transform group-hover:scale-x-100" />
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full bg-green-100 py-8 px-4">

                <div className="container mx-auto   flex flex-col gap-3 max-w-screen-lg">
                    <div className="text-brand font-bold text-3xl" >Executive Class</div>
                    <div className="text-gray-700 text-lg max-w-screen-lg " >For those who appreciate a touch of elegance, our Executive Class cars offer sophistication and style. Whether you're heading to a business meeting or a special event, these premium vehicles ensure you arrive in comfort and class.</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {fleet.filter((item) => { if (item.class === 'executive') { return true } }).map((fleet, index) => (
                            <div
                                key={index}
                                className="block group"
                            >
                                <div className="bg-white border border-gray-200 rounded-sm p-8 transition-shadow hover:shadow-lg">
                                    <div className="relative h-48 mb-6">
                                        <Image
                                            src={fleet.image}
                                            alt={fleet.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl text-brand font-medium relative inline-block">
                                            {fleet.name}
                                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand transform scale-x-0 transition-transform group-hover:scale-x-100" />
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-100 py-8 px-4">

                <div className="container mx-auto   flex flex-col gap-3 max-w-screen-lg">
                    <div className="text-brand font-bold text-3xl" >Executive Premium Class</div>
                    <div className="text-gray-700 text-lg max-w-screen-lg " >Experience the pinnacle of modern luxury with our Executive Premium vehicles. Combining cutting-edge technology and superior comfort, this option is perfect for those who demand the very best.</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {fleet.filter((item) => { if (item.class === 'executive_premium') { return true } }).map((fleet, index) => (
                            <div
                                key={index}
                                className="block group"
                            >
                                <div className="bg-white border border-gray-200 rounded-sm p-8 transition-shadow hover:shadow-lg">
                                    <div className="relative h-48 mb-6">
                                        <Image
                                            src={fleet.image}
                                            alt={fleet.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl text-brand font-medium relative inline-block">
                                            {fleet.name}
                                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand transform scale-x-0 transition-transform group-hover:scale-x-100" />
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full bg-green-100 py-8 px-4">

                <div className="container mx-auto   flex flex-col gap-3 max-w-screen-lg">
                    <div className="text-brand font-bold text-3xl" >XL Passenger Van</div>
                    <div className="text-gray-700 text-lg max-w-screen-lg " >Traveling with a group or extra luggage?<br />
                        Our spacious XL Passenger Vans are designed to accommodate up to 8 passengers with plenty of room for your belongings. Ideal for family trips or group outings, these vans offer convenience and comfort for all.</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {fleet.filter((item) => { if (item.class === 'passenger_van') { return true } }).map((fleet, index) => (
                            <div
                                key={index}
                                className="block group"
                            >
                                <div className="bg-white border border-gray-200 rounded-sm p-8 transition-shadow hover:shadow-lg">
                                    <div className="relative h-48 mb-6">
                                        <Image
                                            src={fleet.image}
                                            alt={fleet.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl text-brand font-medium relative inline-block">
                                            {fleet.name}
                                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand transform scale-x-0 transition-transform group-hover:scale-x-100" />
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>




            <div className="max-w-screen-lg mx-auto px-3">
                <div className="p-4 bg-white rounded-lg shadow-lg my-14 border border-gray-200 ">
                    <h2 className="text-3xl font-semibold text-brand mb-6">Why Choose OkTaxis?</h2>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-start space-x-2">
                            <span className="text-xl">🚗</span>
                            <p className="text-lg">
                                <strong>Professional Drivers:</strong> Courteous, experienced, and committed to your safety.
                            </p>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-xl">🚙</span>
                            <p className="text-lg">
                                <strong>Clean & Well-Maintained Vehicles:</strong> We ensure every car is spotless and in excellent condition.
                            </p>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-xl">⏰</span>
                            <p className="text-lg">
                                <strong>Punctual Service:</strong> We value your time and guarantee timely pickups and drop-offs.
                            </p>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-xl">🔄</span>
                            <p className="text-lg">
                                <strong>Flexible Options:</strong> Choose between airport transfers or hourly services tailored to your needs.
                            </p>
                        </li>
                    </ul>
                    <p className="mt-6 text-lg text-gray-700">
                        Whether you're traveling to or from Manchester Airport or Liverpool Airport, or need a dependable ride for a few hours, OkTaxis has the perfect vehicle to match your needs.
                    </p>
                    <p className="mt-4 text-lg text-gray-700">
                        Book your ride today and experience seamless, professional transportation in the Manchester area and beyond!
                    </p>
                    <div className="mt-6 flex justify-center">
                        <Link href='/booking' className="px-6 py-2 bg-brand text-white font-semibold rounded-lg hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}
