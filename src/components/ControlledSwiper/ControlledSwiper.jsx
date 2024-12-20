import { useRef, useState } from "react";
import styles from "./ControlledSwiper.module.css";
import "./swiper.css";

// Icons
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";

import AlbumCard from "../AlbumCard/AlbumCard";

import estiloBiblioteca from "../../pages/Biblioteca/Biblioteca.module.css";
import { useNavigate } from "react-router-dom";
import { MusicValue } from "../../context/MusicContext";
import { useTranslation } from "react-i18next";
import ArtistCard from "../ArtistCard/ArtistCard";

const ControlledSwiper = ({ tit, arr = [], modo = "album" }) => {
   const { t } = useTranslation();
   const { dispatch } = MusicValue();

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
            className="swiperControlado"
            spaceBetween={20}
            autoplay={(true, { delay: 8000 })}
            slidesPerView={"auto"}
            allowTouchMove={false}
            modules={[Navigation, Pagination, A11y, Autoplay]}
         >
            {arr.length > 0
               ? arr.map((v, k) => {
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
                                foto={v.images[0].url}
                                nome={v.name}
                                subtit={v.artists[0].name}
                                variante="swiper"
                             />
                          </SwiperSlide>
                       );
                    } else if (modo === "single") {
                       return (
                          <SwiperSlide key={k}>
                             <AlbumCard
                                acao={() => {
                                   dispatch({ type: "setIdAlbum", payload: "" });
                                   dispatch({ type: "setIdPlaylist", payload: "" });
                                   dispatch({ type: "setTargetAtual", payload: 0 });
                                   dispatch({ type: "setaSeguir", payload: [v.track] });
                                   dispatch({ type: "setMusicaAtual", payload: [v.track] });
                                   dispatch({ type: "setMode", payload: "playlistMode" });
                                   dispatch({ type: "setSingleMode", payload: true });
                                   navegar("/leitor");
                                }}
                                foto={v?.track?.album?.images[0]?.url}
                                nome={v?.track?.name}
                                key={k}
                                subtit={v?.track?.artists[0]?.name}
                                variante="swiper"
                             />
                          </SwiperSlide>
                       );
                    } else if (modo === "playlist") {
                       return (
                          <SwiperSlide key={k}>
                             <AlbumCard
                                acao={() => {
                                   dispatch({ type: "setIdPlaylist", payload: v.id });
                                   dispatch({ type: "setIdAlbum", payload: "" });
                                   dispatch({ type: "setTargetAtual", payload: 0 });
                                   dispatch({ type: "setMode", payload: "playlistMode" });
                                   dispatch({ type: "setSingleMode", payload: false });
                                   navegar("/leitor");
                                }}
                                variante="swiper"
                                foto={v?.images[0]?.url}
                                nome={v?.name}
                                subtit={`${v?.tracks?.total} ${t("pages.biblioteca.albumCard.many")}`}
                             />
                          </SwiperSlide>
                       );
                    } else if (modo === "artist") {
                       return (
                          <SwiperSlide key={k}>
                             <ArtistCard foto={v?.images[1]?.url} nome={v?.name} idArtista={v?.id} />
                          </SwiperSlide>
                       );
                    }
                 })
               : modo === "artist"
               ? [1, 2, 3, 4, 5, 6, 7, 8].map((v, k) => (
                    <SwiperSlide key={k}>
                       <ArtistCard />
                    </SwiperSlide>
                 ))
               : [1, 2, 3, 4].map((v, k) => (
                    <SwiperSlide key={k}>
                       <AlbumCard />
                    </SwiperSlide>
                 ))}
         </Swiper>
      </div>
   );
};

export default ControlledSwiper;
