import Image from "next/image";
import { ReactNode } from "react";

interface ImageTextSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string | ReactNode;
  bgColor?: string;
  imagePosition?: "left" | "right";
}

const ImageTextSection = ({
  imageSrc,
  imageAlt,
  title,
  text,
  bgColor = "bg-white",
  imagePosition = "left",
}: ImageTextSectionProps) => {
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}>
          
          {/* ✅ Image: uniform size, responsive */}
          <div className="lg:w-1/2 w-full">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          {/* ✅ Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-brand mb-6">
              {title}
            </h2>
            {typeof text === 'string' ? (
              <p className="text-lg text-gray-600 mb-8">
                {text}
              </p>
            ) : (
              <div className="text-lg text-gray-600 mb-8">
                {text}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTextSection;
