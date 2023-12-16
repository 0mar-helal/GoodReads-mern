// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

const BannerSlider = () => {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="banner-swiper"
    >
      {[1, 2, 3, 4, 5].map((img) => (
        <SwiperSlide key={img}>
          <img src={`/assets/banner-books/book${img}.png`} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
