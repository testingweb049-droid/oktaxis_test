import Image from "next/image";
import { ReactNode } from "react";

interface ImageTextSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string | ReactNode;
  bgColor?: string;
  imagePosition?: "left" | "right";
  imageWidth?: number;
  imageHeight?: number;
}

const ImageTextSection = ({
  imageSrc,
  imageAlt,
  title,
  text,
  bgColor = "bg-white",
  imagePosition = "left",
  imageWidth = 600,
  imageHeight = 400
}: ImageTextSectionProps) => {
  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}>
          {/* Image Container: fixed max size but responsive */}
          <div className="lg:w-1/2 flex justify-center">
            <Image 
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: `${imageWidth}px`,
                maxHeight: `${imageHeight}px`
              }}
              className="rounded-lg shadow-xl object-cover"
              priority={false}
            />
          </div>

          {/* Text Content */}
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
