import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { okTaxisContent } from "@/constants/homePageData"
import Image from "next/image"
import TeamImage from "@/assets/homeImages/team.jpg"

export default function OurStory() {
  const { heading, description, reasons, footer } = okTaxisContent

  return (
    <>
      {/* First Section */}
      <section className="full-width-section flex flex-col-reverse lg:flex-row m-auto py-6 md:py-16 lg:py-20 px-4">
        <Image
          src={TeamImage}
          alt="Image"
          className="w-full lg:w-[50%] object-cover"
        />
        <Card className="border-none shadow-none">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold">
              <span className="text-brand">Manchester</span> Airport Taxi/ Instant <span className="text-brand">Manchester Airport</span> Transfer Quote
              </h1>
              <div className="space-y-4 text-gray-600">
                <p>
                  Find the cheapest taxi to or from Manchester Airport with OKTAXIS. Book a taxi to Manchester Airport Online. Top-tier Luxury, Comfort, style, and reliability await.
                </p>
                <p>
                  OKTAXIS Offers guaranteed pickups and tracks flight landing times. If a flight is delayed or early, they will adjust the requested time.
                </p>
                <p>
                  OKTAXIS Offers luxury airport transfers and taxis to or from Manchester Airport and Liverpool Airport. We aim to ensure that customers arrive at the airport on time and are picked up promptly upon return.
                </p>
                <p>
                  <span className="font-bold text-brand">OKTAXIS:</span> Offers pre-booked vehicles, private car services, and hourly services.
                </p>
                <p>
                  <span className="font-bold text-brand">OKTAXIS:</span> Offers Manchester Airport transfers and Liverpool Airport Transfers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

