import React from "react"
import Image from "next/image"
import Heading from "@/components/Heading"

export function TransfersSection() {
  return (
    <section className=" bg-light-background py-16 sm:py-20 lg:py-24 font-montserrat">
      <div className="full-width-section">
      
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 xl:gap-16 items-center">
          {/* Left column - text content */}
          <div className="max-w-2xl">
            <Heading
              as="h2"
              align="left"
              className="!mb-6"
            >
              Transfers: Liverpool Airport to Manchester
            </Heading>

            <p className="text-base sm:text-lg md:text-xl text-text-gray !leading-relaxed mb-8 sm:mb-10 md:mb-12">
              A huge number of our clients land in Liverpool but need to get to
              Manchester. The train journey involves a bus to Liverpool South
              Parkway, a train to Oxford Road, and often another taxi. Our
              transfer cuts out the middleman.
            </p>

            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              {/* The Route */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shrink-0">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 sm:w-8 sm:h-8"
                  >
                    <path
                      d="M31.5357 23.914L23.8448 6.30842C23.5713 5.68233 22.9755 5.28125 22.3197 5.28125H16.9506L17.0853 6.55545C17.1129 6.81513 16.9087 7.04181 16.6474 7.04181H15.0431C14.7818 7.04181 14.5777 6.81513 14.6052 6.55545L14.74 5.28125H9.37081C8.71445 5.28125 8.11861 5.68233 7.84518 6.30842L0.154299 23.914C-0.354611 25.0798 0.457445 26.4079 1.68048 26.4079H12.5101L13.0773 21.0338C13.1246 20.586 13.5021 20.246 13.9527 20.246H17.7378C18.1884 20.246 18.5659 20.586 18.6132 21.0338L19.1804 26.4079H30.01C31.2331 26.4079 32.0451 25.0798 31.5357 23.914ZM14.3268 9.19629C14.3382 9.08812 14.3893 8.98801 14.4701 8.91527C14.551 8.84252 14.6559 8.8023 14.7647 8.80236H16.9263C17.1514 8.80236 17.3406 8.97237 17.3643 9.19629L17.6174 11.5939C17.6586 11.984 17.3527 12.3235 16.961 12.3235H14.7306C14.3383 12.3235 14.033 11.984 14.0742 11.5939L14.3268 9.19629ZM17.3659 18.4854H14.324C13.8014 18.4854 13.3937 18.0326 13.4487 17.5127L13.7276 14.8719C13.7749 14.424 14.1524 14.084 14.603 14.084H17.087C17.5376 14.084 17.915 14.424 17.9623 14.8719L18.2413 17.5127C18.2963 18.0326 17.8886 18.4854 17.3659 18.4854Z"
                      fill="#FFB400"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-[26px] md:text-3xl font-semibold text-heading-black mb-1.5 sm:mb-2">
                    The Route
                  </h3>
                  <p className="text-lg sm:text-xl text-text-gray leading-[34px]">
                    We typically use the M62 or the scenic route via Widnes,
                    depending on traffic conditions to ensure the fastest
                    journey.
                  </p>
                </div>
              </div>

              {/* Time Efficient */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shrink-0">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 sm:w-8 sm:h-8"
                  >
                    <path
                      d="M15.8459 0.496094C7.36639 0.496094 0.496094 7.36639 0.496094 15.8459C0.496094 24.3255 7.36639 31.1958 15.8459 31.1958C24.3255 31.1958 31.1958 24.3255 31.1958 15.8459C31.1958 7.36639 24.3255 0.496094 15.8459 0.496094ZM21.5706 19.8691L20.3327 21.4164C20.2514 21.518 20.151 21.6026 20.0371 21.6653C19.9231 21.7281 19.798 21.7678 19.6687 21.7821C19.5395 21.7965 19.4086 21.7853 19.2837 21.7491C19.1588 21.7129 19.0422 21.6524 18.9407 21.5712L14.7937 18.4938C14.504 18.2618 14.2701 17.9676 14.1094 17.633C13.9487 17.2984 13.8653 16.932 13.8653 16.5608V6.93313C13.8653 6.67048 13.9696 6.41859 14.1554 6.23287C14.3411 6.04715 14.593 5.94281 14.8556 5.94281H16.8363C17.0989 5.94281 17.3508 6.04715 17.5365 6.23287C17.7222 6.41859 17.8266 6.67048 17.8266 6.93313V15.8459L21.4164 18.4765C21.5181 18.5577 21.6026 18.6583 21.6654 18.7723C21.7281 18.8863 21.7678 19.0115 21.7821 19.1408C21.7964 19.2702 21.7851 19.4011 21.7488 19.526C21.7125 19.651 21.6519 19.7675 21.5706 19.8691Z"
                      fill="#FFB400"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-[26px] md:text-3xl font-semibold text-heading-black mb-1.5 sm:mb-2">
                    Time Efficient
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-600 leading-[34px]">
                    The journey to Manchester City Centre usually takes just 50
                    minutes, door-to-door, giving you more time to relax or
                    prepare for meetings.
                  </p>
                </div>
              </div>

              {/* Maximum Comfort */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shrink-0">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 sm:w-8 sm:h-8"
                  >
                    <path
                      d="M7.9225 29.7092H23.7675V4.95141C23.7675 3.3112 22.4368 1.98047 20.7966 1.98047H10.8934C9.25323 1.98047 7.9225 3.3112 7.9225 4.95141V29.7092ZM11.8837 5.94172H19.8062V7.92234H11.8837V5.94172ZM31.69 10.8933V26.7383C31.69 28.3785 30.3593 29.7092 28.7191 29.7092H25.7481V7.92234H28.7191C30.3593 7.92234 31.69 9.25308 31.69 10.8933ZM5.94187 29.7092H2.97094C1.33073 29.7092 0 28.3785 0 26.7383V10.8933C0 9.25308 1.33073 7.92234 2.97094 7.92234H5.94187V29.7092Z"
                      fill="#FFB400"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-[26px] md:text-3xl font-semibold text-heading-black mb-1.5 sm:mb-2">
                    Maximum Comfort
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-600 leading-[34px]">
                    Forget hauling luggage on and off trains. Our drivers load
                    your bags at the terminal and unload them at your
                    destination for a completely stress-free journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - image with overlay */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full rounded-[12px] overflow-hidden shadow-[0px_25px_50px_-12px_#00000040]">
              <div className="relative aspect-[4/4] w-full">
                <Image
                  src="/assets/liverpool-images/transfer-img.png"
                  alt="Direct transfer from Liverpool Airport to Manchester"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Bottom overlay */}
                <div className="absolute left-5 right-5 sm:left-6 sm:right-6 bottom-5 sm:bottom-12 flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/90">
                    <svg
                      width="43"
                      height="43"
                      viewBox="0 0 43 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                    >
                      <path
                        d="M21.1257 3.51953C14.3128 3.51953 8.80273 9.02964 8.80273 15.8424C8.80273 25.0846 21.1257 38.7279 21.1257 38.7279C21.1257 38.7279 33.4486 25.0846 33.4486 15.8424C33.4486 9.02964 27.9385 3.51953 21.1257 3.51953ZM21.1257 20.2435C19.9584 20.2435 18.839 19.7798 18.0136 18.9545C17.1883 18.1291 16.7246 17.0097 16.7246 15.8424C16.7246 14.6752 17.1883 13.5558 18.0136 12.7304C18.839 11.9051 19.9584 11.4414 21.1257 11.4414C22.2929 11.4414 23.4123 11.9051 24.2377 12.7304C25.063 13.5558 25.5267 14.6752 25.5267 15.8424C25.5267 17.0097 25.063 18.1291 24.2377 18.9545C23.4123 19.7798 22.2929 20.2435 21.1257 20.2435Z"
                        fill="#FFB400"
                      />
                    </svg>
                  </div>

                  <div className="text-white drop-shadow-sm flex flex-col gap-2">
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200">
                      Direct Connection
                    </p>
                    <p className="text-2xl sm:text-3xl md:text-[32px] font-semibold text-white leading-tight">
                      LPL to Manchester City
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default TransfersSection


