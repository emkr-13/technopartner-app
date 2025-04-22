import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

interface BannerSliderProps {
  banners: string[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <div
        className={`w-2 h-2 rounded-full ${
          i === currentSlide ? "bg-green-500" : "bg-gray-300"
        }`}
      />
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {banners.map((url, index) => (
          <div
            key={index}
            className="h-48 md:h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
      </Slider>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(banners.length)].map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentSlide ? "bg-green-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
