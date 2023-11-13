import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { musicContext } from "../../App";

const ControlledSwiper = ({ tit, arr = [], modo = "album" }) => {
   const { estado, dispatch } = useContext(musicContext);

   const swiperRef = useRef();

   const [activeIndex, setActiveIndex] = useState(1);

   const navegar = useNavigate();

   return (
      <div id={styles.ct}>
         <div id={styles.linha}>
            <h2 className={estiloBiblioteca.tit1}>
               {tit} <span key={activeIndex} id={styles.sp}>{`(${activeIndex}/${arr.length})`}</span>
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
            onSlideChange={(e) => setActiveIndex(e.activeIndex + 1)}
            className="swiper"
            spaceBetween={20}
            autoplay={(true, { delay: 8000 })}
            slidesPerView={"auto"}
            allowTouchMove={false}
            modules={[Navigation, Pagination, A11y, Autoplay]}
         >
            {arr.length > 0 ? (
               arr.map((v, k) => {
                  if (modo === "album") {
                     return (
                        <SwiperSlide key={k}>
                           <AlbumCard
                              acao={() => {
                                 dispatch({ type: "setIdAlbum", payload: v.id });
                                 dispatch({ type: "setIdPlaylist", payload: "" });
                                 dispatch({ type: "setTargetAtual", payload: 0 });
                                 dispatch({ type: "setMode", payload: "albumMode" });
                                 dispatch({ type: "setAlbumAtual", payload: [v] });
                                 navegar("/leitor");
                              }}
                              foto={v.images[0]?.url}
                              nome={v.name}
                              subtit={v.artists[0].name}
                           />
                        </SwiperSlide>
                     );
                  } else if (modo === "playlist") {
                     return (
                        <SwiperSlide key={k}>
                           <AlbumCard foto={v?.track?.album?.images[0]?.url} nome={v?.track?.name} subtit={v?.track?.artists[0].name} />
                        </SwiperSlide>
                     );
                  } else if (modo === "single") {
                     return (
                        <SwiperSlide key={k}>
                           <AlbumCard foto={v.images[0]?.url} nome={v.name} subtit={v.artists[0].name} />
                        </SwiperSlide>
                     );
                  }
               })
            ) : (
               <>
                  <SwiperSlide>
                     <AlbumCard />
                  </SwiperSlide>
                  <SwiperSlide>
                     <AlbumCard />
                  </SwiperSlide>
                  <SwiperSlide>
                     <AlbumCard />
                  </SwiperSlide>
               </>
            )}
         </Swiper>
      </div>
   );
};

export default ControlledSwiper;
