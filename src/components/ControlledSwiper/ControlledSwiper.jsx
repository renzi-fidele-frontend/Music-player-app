import React, { useEffect, useRef, useState } from "react";
import styles from "./ControlledSwiper.module.css";
import "./swiper.css";

// Icons
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";

import AlbumCard from "../AlbumCard/AlbumCard";

import estiloBiblioteca from "../../pages/Biblioteca/Biblioteca.module.css";

const ControlledSwiper = ({ tit, arr = [] }) => {
   const swiperRef = useRef();

   const [activeIndex, setActiveIndex] = useState(1);

   return (
      <div id={styles.ct}>
         <div id={styles.linha}>
            <h2 className={estiloBiblioteca.tit1}>
               {tit} <span id={styles.sp}>{`(${activeIndex}/${arr.length})`}</span>
            </h2>
            <div id="botoes-slider">
               <MdNavigateBefore
                  onClick={() => {
                     console.log(swiperRef.current);
                     swiperRef.current.slidePrev();
                  }}
               />
               <MdNavigateNext
                  onClick={() => {
                     swiperRef.current.slideNext();
                  }}
               />
            </div>
         </div>

         <Swiper
            onSwiper={(swiperNovo) => {
               swiperRef.current = swiperNovo;
            }}
            onSlideChange={(e) => setActiveIndex(e.activeIndex+1)}
            className="swiper"
            spaceBetween={20}
            autoplay={(true, { delay: 8000 })}
            slidesPerView={"auto"}
            allowTouchMove={false}
            modules={[Navigation, Pagination, A11y, Autoplay]}
         >
            {arr.length > 0 &&
               arr.map((v, k) => {
                  return (
                     <SwiperSlide key={k}>
                        <AlbumCard foto={v.images[0]?.url} nome={v.name} subtit={v.artists[0].name} />
                     </SwiperSlide>
                  );
               })}
         </Swiper>
      </div>
   );
};

export default ControlledSwiper;
