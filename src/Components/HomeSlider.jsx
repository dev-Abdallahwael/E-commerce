import React from 'react';
import ImgMainSlider from "../assets/imgs/slider-image-main.jpeg";
import ImgSecondSlider from "../assets/imgs/slider-image-child-1.jpeg";
import ImgThirdSlider from "../assets/imgs/slider-image-childe-2.jpeg";
import ImgSlider1 from "../assets/imgs/slider-1.jpeg";
import ImgSlider2 from "../assets/imgs/slider-image-1.jpeg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function HomeSlider() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12  mb-8">
      <div className="md:col-span-8 col-span-1">
        <div className="h-full w-full">
          <Swiper className="h-full" 
          loop={true}
          modules={[Autoplay]} //Autoplay module
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}>
            <SwiperSlide>
              <img src={ImgMainSlider} alt="Main slider" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={ImgSecondSlider} alt="Second slider" className="w-full h-full object-cover" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={ImgThirdSlider} alt="Third slider" className="w-full h-full object-cover" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="md:col-span-4 col-span-1 flex flex-row md:flex-col">
        <img src={ImgSlider2} alt="Side slider 1" className="w-1/2 md:w-full object-cover" />
        <img src={ImgSlider1} alt="Side slider 2" className="w-1/2 md:w-full object-cover" />
      </div>
    </section>
  );
}
