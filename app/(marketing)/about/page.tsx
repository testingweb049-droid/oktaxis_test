import Image from "next/image"
import HeroImg from "@/assets/bmw.png";
import { aboutUsContent } from "@/constants/aboutUsData"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-100">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 min-h-[60vh] lg:min-h-[80vh] bg-cover bg-center bg-no-repeat relative " style={{ backgroundImage: `url('${HeroImg.src}')` }}>
        <div className="absolute inset-0 bg-black/15 bg-opacity-60"></div>
        <div className="container m-auto px-4 md:px-6 relative z-10">
          {/* <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black ">
            
              We make sure that your every trip is <span className="text-brand">reliable</span> & <span className="text-brand">comfortable</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg md:text-xl text-black font-semibold">
              {aboutUsContent.hero.description}
            </p>

          </div> */}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 mx-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              <span className="text-brand">Why</span> Choose Us
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              {aboutUsContent.whyChooseUs.subtitle}
            </p>
            <p className="mx-auto max-w-screen-lg text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {aboutUsContent.whyChooseUs.description}
            </p>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="w-full m-auto py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container m-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 ">
            {aboutUsContent.features.map((feature, index) => (
              <Card key={index} className="flex flex-col items-center text-center hover:bg-gray-100">
                <CardHeader>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={200}
                    height={200}
                    className="rounded-full object-fit"
                  />
                  <CardTitle className="mt-4 text-brand">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full m-auto py-12 md:py-24 lg:py-32">
        <div className="container m-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {/* {aboutUsContent.hero.title} */}
              We Make Sure That Your Every Trip Is <span className="text-brand">Reliable</span> & <span className="text-brand">Comfortable</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {aboutUsContent.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full m-auto py-12 md:py-24 lg:py-32 bg-white">
        <div className="container m-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {aboutUsContent.services.map((service, index) => (
              <Card key={index} className="flex flex-col hover:bg-gray-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-[200px]"
                />
                <CardHeader>
                  <CardTitle className="text-brand">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

