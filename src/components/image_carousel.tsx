import { useState, useEffect } from "react";

const ImageCarousel = () => {
  const images = [
    "https://ydjtoaowwbotqberabzh.supabase.co/storage/v1/object/public/kg_lahore/2277EA1D-6853-460D-9057-78881BD0774B.jpeg",
    "https://ydjtoaowwbotqberabzh.supabase.co/storage/v1/object/public/kg_lahore/63FBE779-9857-4DA2-80BE-53494EBCB180.jpeg",
    "https://ydjtoaowwbotqberabzh.supabase.co/storage/v1/object/public/kg_lahore/71e94f6e-1a66-4a09-86d0-ed36ca2b8511.JPG",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700"
        style={{
          transform: `translateX(-${(100 / images.length) * currentIndex}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            className="object-cover h-96 w-full"
            src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-brand-green" : "bg-brand-gray"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
