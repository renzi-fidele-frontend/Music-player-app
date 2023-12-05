import React, { useContext, useEffect } from "react";
import styles from "./Swiper3d.module.css";

// SwiperJs
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ArtistCard from "../ArtistCard/ArtistCard";
import { musicContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Swiper3d = ({ arr = [] }) => {
   const { dispatch } = useContext(musicContext);
   const navegar = useNavigate()

   return (
      <div id={styles.ct}>
         <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={"30px"}
            autoplay={{ pauseOnMouseEnter: false, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="swiper_cont"
            breakpoints={{ 250: { slidesPerView: 1 }, 400: { slidesPerView: 2 }, 900: { slidesPerView: 3 }, 1500: { slidesPerView: "auto" } }}
         >
            {arr.map((v, key) => {
               return (
                  <SwiperSlide key={key} className={styles.slide}>
                     {v?.images[1]?.url && (
                        <ArtistCard
                           acao={() => {
                              dispatch({ type: "setMode", payload: "playlistMode" });
                              dispatch({ type: "setIdPlaylist", payload: "" });
                              dispatch({ type: "setTargetAtual", payload: 0 });
                              dispatch({ type: "setIdAlbum", payload: "" });
                              dispatch({ type: "setSingleMode", payload: true });
                              navegar("/leitor#", { state: { idArtistaFavorito: v?.id } });
                           }}
                           nome={v?.name}
                           foto={v?.images[1]?.url}
                           alt="Imagem do slide"
                        />
                     )}
                  </SwiperSlide>
               );
            })}

            <div className="slider-controler">
               <div className="swiper-pagination"></div>
            </div>
         </Swiper>
      </div>
   );
};



export default Swiper3d;
