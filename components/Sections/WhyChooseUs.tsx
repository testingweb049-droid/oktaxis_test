import { okTaxisContent } from "@/constants/homePageData"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

  
  export default function WhyChooseUs() {
    return (
      <section className="w-full m-auto py-12 md:py-16 lg:py-20">
        <div className="container items-center m-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-4xl font-semibold">
              {/* {okTaxisContent.heading} */}
              Reliable <span className="text-brand">Manchester Airport</span> Transfers – OkTaxis
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 text-sm lg:text-[17px] leading-[24px]  dark:text-gray-400">
              {okTaxisContent.description}
            </p>
          </div>
          <div className="m-auto items-center grid  gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {okTaxisContent.reasons.map((reason, index) => (
              <Card key={index} className="h-full hover:bg-gray-100">
                <CardHeader className="text-center items-center m-auto">
                <div className="w-12 h-12 text-6xl flex items-center justify-center text-center text-brand bg-gray-50 rounded-full">
                  <reason.icon/>
                </div>
                  <CardTitle className="text-xl font-bold text-center">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center">
                    {reason.details}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-y-4 items-center justify-center mx-auto max-w-[700px] text-center text-gray-500 dark:text-gray-400">
            {okTaxisContent.footer}
            <Link
              href="/booking"
            >
              <Button
                className="bg-brand hover:bg-brand"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }
  
  