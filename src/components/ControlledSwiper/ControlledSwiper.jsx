import React, { useEffect, useRef } from "react";
import styles from "./ControlledSwiper.module.css";
import "./swiper.css";

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";

import AlbumCard from "../AlbumCard/AlbumCard";

const ControlledSwiper = ({ arr = [] }) => {
   useEffect(() => {}, []);

   return (
      <div id={styles.ct}>
         <Swiper
            className="swiper"
            spaceBetween={20}
            autoplay={(true, { delay: 8000 })}
            slidesPerView={5}
            loop={true}
            allowTouchMove={true}
            modules={[Navigation, Pagination, A11y, Autoplay]}
         >
            {arr.length > 0 &&
               arr.map((v, k) => {
                  return (
                     <SwiperSlide key={k}>
                        <AlbumCard
                           foto={v.images[0]?.url}
                           nome={v.name}
                           subtit={v.total_tracks === 1 ? `1 Música` : `${v.total_tracks} Músicas`}
                        />
                     </SwiperSlide>
                  );
               })}
         </Swiper>
      </div>
   );
};

export default ControlledSwiper;
