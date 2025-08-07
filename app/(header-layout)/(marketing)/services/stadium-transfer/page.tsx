import FleetClasses from "@/components/home/fleet";
import Offer from "@/components/ui/do-offer";
import HeroSection2 from "@/components/ui/hero-section2";
import ImageTextSection from "@/components/ui/ImageTextSection";
import Image from "next/image";
import { FaFutbol, FaMusic, FaUsers, FaCarSide } from "react-icons/fa";
import Seo from "../../../../../components/Seo";
export default function StadiumTransfer() {
  return (
    <>
      <Seo
        title="Stadium Transfers in Manchester | OKTaxis"
        description="Book luxury stadium transfers to Old Trafford, Etihad, AO Arena and more with OKTaxis. Reliable chauffeur services for match days, concerts & events."
        url="https://oktaxis.co.uk/services/stadium-transfers"
        image="https://oktaxis.co.uk/Manchester%20Stadium%20Transfers.jpg"
      />
      <HeroSection2
        bgImage="/Manchester Stadium Transfers.jpg" // Updated image
        title="Premier Stadium and Event Transfers in Manchester"
      // description="Need a transfer to a Manchester stadium? OKTaxi Service has got you covered. Avoid the hassle and secure your ride ahead of time by booking with us—so you won't be left stranded on match day. Dependable and professional taxi service in Manchester."
      />
      <Offer />
      <ImageTextSection
        imageSrc="/Manchester Stadium Transfers.jpg"
        imageAlt="Stadium transfer service"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Stress-Free{' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Stadium and Event</span>{' '}
            Transfers

          </span>
        }
        text="Cheer on your team or enjoy a concert without travel worries. OKTaxis offers reliable Old Trafford taxi service and transfers to Etihad Stadium, AO Arena, and other Manchester venues. Pre-book your ride, and our professional chauffeurs, familiar with event schedules and parking restrictions, will ensure timely and safe navigation through crowds for a hassle-free experience."
        bgColor="bg-white"
        imagePosition="left"
      />

      {/* Group Service Section */}
      <ImageTextSection
        imageSrc="/Stadium Transfers in Manchester.jpg"
        imageAlt="Group stadium transfer"
        title=
        {
          <span className="text-3xl md:text-4xl font-bold">
            Group{' '}
            <span className="text-brand text-3xl md:text-4xl font-bold">Transportation</span>{' '}
            Solutions
          </span>
        }
        text="Our special event rates cater to groups of all sizes. Whether a solo trip or a large party, our luxury vehicles—from sedans to minibuses—offer air-conditioned comfort. Skip post-event taxi queues with coordinated pickups, ensuring a swift exit after the final whistle or encore. Focus on the match or show, and let OKTaxis handle your Manchester event transport."
        bgColor="bg-white"
        imagePosition="right"
      />
      <section className="flex flex-col md:flex-row items-start justify-between container px-4 py-32 gap-10 md:gap-20">
        <div className="md:w-1/2 relative h-64 w-full md:h-80">
          <Image
            src="/Services to Manchester & Liverpool Football Stadiums.jpg"
            alt="Car service in Manchester"
            width={600}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: `600px`,
              maxHeight: `400px`,
            }}
            className="rounded-lg shadow-xl object-cover"
            priority={false}
          />
        </div>
        {/* Left side content */}
        <div className="flex flex-col space-y-6 md:w-1/2">
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-bold">
              Manchester Stadium and{' '}
              <span className="text-brand text-3xl md:text-4xl font-bold">Event Services</span>
            </span>
          </h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Football and Event Venues:</strong> <br />
              Reliable transport to Manchester City’s Etihad Stadium, Old Trafford, and Liverpool venues for matches, rugby games, or concerts.
            </li>
            <li>
              <strong>Airport Connections:</strong> <br />
              Seamless transfers from stadiums to Manchester Airport, ensuring smooth onward journeys.
            </li>
            <li>
              <strong>Group-Friendly Options:</strong> <br />
              Meet at stadium entrances or nearby locations for convenience, with minibuses available for corporate hospitality or fan groups.
            </li>
            <li>
              <strong>Luxury Comfort:</strong> <br />
              Relax post-event in our premium fleet, featuring spacious seating and a smooth ride to your next destination.
            </li>
          </ul>
        </div>


        {/* Right side image */}
      </section>

      <div className="mt-16">
        <section className="flex flex-col md:flex-row items-start justify-between container px-4 py-32 gap-10 md:gap-20 mt-12">
          {/* Left side content */}
          <div className="flex flex-col space-y-6 md:w-1/2">
            <h2 className="text-3xl  font-semibold flex items-center gap-3">
              {
                <span className="text-3xl md:text-4xl font-bold">
                  Old{' '}
                  <span className="text-brand text-3xl md:text-4xl font-bold">Trafford and</span>{' '}
                  Etihad Stadium {" "}
                  <span className="text-brand text-3xl md:text-4xl font-bold">Transfers</span>{' '}
                </span>
              }
            </h2>
            <ul className="space-y-4 text-gray-700 text-lg">
              <li>
                Count on OKTaxis for dependable taxi services between Manchester Airport and iconic venues like{" "}
                <strong> Old Trafford and the Etihad Stadium.</strong> Whether attending a Premier League{" "}
                <strong>
                  {" "}
                  match, concert, or special event, our professional chauffeurs provide timely, comfortable transfers.
                </strong>{" "}

                Arrive refreshed and return to the airport effortlessly with our luxury airport transfers Manchester.
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 relative h-64 w-full md:h-80">
            <Image
              src="/Old Trafford and the Etihad Stadium Transfers.jpg"
              alt="Car service in Manchester"
              width={600}
              height={400}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: `600px`,
                maxHeight: `400px`,
              }}
              className="rounded-lg shadow-xl object-cover"
              priority={false}
            />
          </div>
          {/* Right side image */}
        </section>
      </div>
      <FleetClasses />
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center  mb-12">

            {
              <span className="text-3xl md:text-4xl font-bold">
                Our Stadium Transfer{' '}
                <span className="text-brand text-3xl md:text-4xl font-bold">Services</span>{' '}

              </span>
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaFutbol className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Matchdays & Concerts
              </h3>
              <p className="text-gray-600">
                 Available for football, rugby, concerts, and large events across Manchester.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaCarSide className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Pickup</h3>
              <p className="text-gray-600">
                 Meet at stadium entrances or nearby locations for time-saving convenience.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Group Friendly</h3>
              <p className="text-gray-600">
                Multiple vehicles and minibuses for corporate groups or fan parties.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaMusic className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Premium Comfort
              </h3>
              <p className="text-gray-600">
                Enjoy a luxurious, relaxing ride home or to your next destination after the event.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
