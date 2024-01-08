import React, { useContext } from "react";
import styles from "./DestaquesContainer.module.css";
import DestaqueCard from "../../components/DestaqueCard/DestaqueCard";
import { musicContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./swiperDestaques.css";

// SwiperJs
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

const DestaquesContainer = () => {
   const { estado } = useContext(musicContext);

   const navegar = useNavigate();

   // Conteúdo dos cards de destaques
   const conteudoSemelhantes =
      estado.semelhantes.length > 0
         ? [
              {
                 img: estado.semelhantes[0]?.images[2]?.url,
                 subtit: estado.semelhantes[0]?.name,
                 texto: `${estado.semelhantes[0]?.followers?.total} Seguidores`,
              },
              {
                 img: estado.semelhantes[1]?.images[2]?.url,
                 subtit: estado.semelhantes[1]?.name,
                 texto: `${estado.semelhantes[1]?.followers?.total} Seguidores`,
              },
              {
                 img: estado.semelhantes[2]?.images[2]?.url,
                 subtit: estado.semelhantes[2]?.name,
                 texto: `${estado.semelhantes[2]?.followers?.total} Seguidores`,
              },
           ]
         : [];

   const conteudoPlaylistsDestacadas =
      estado.playlistsDestacadas.length > 0
         ? [
              {
                 img: estado.playlistsDestacadas[0]?.images[0]?.url,
                 subtit: estado.playlistsDestacadas[0]?.name,
                 texto: `${estado.playlistsDestacadas[0]?.tracks?.total} Músicas`,
              },
              {
                 img: estado.playlistsDestacadas[1]?.images[0]?.url,
                 subtit: estado.playlistsDestacadas[1]?.name,
                 texto: `${estado.playlistsDestacadas[1]?.tracks?.total} Músicas`,
              },
              {
                 img: estado.playlistsDestacadas[2]?.images[0]?.url,
                 subtit: estado.playlistsDestacadas[2]?.name,
                 texto: `${estado.playlistsDestacadas[2]?.tracks?.total} Músicas`,
              },
           ]
         : [];
   const conteudoLancamentos =
      estado.lancamentos.length > 0
         ? [
              {
                 img: estado.lancamentos[0]?.images[2]?.url,
                 subtit: estado.lancamentos[0]?.name,
                 texto: estado.lancamentos[0]?.artists[0]?.name,
              },
              {
                 img: estado.lancamentos[1]?.images[2]?.url,
                 subtit: estado.lancamentos[1]?.name,
                 texto: estado.lancamentos[1]?.artists[0]?.name,
              },
              {
                 img: estado.lancamentos[2]?.images[2]?.url,
                 subtit: estado.lancamentos[2]?.name,
                 texto: estado.lancamentos[2]?.artists[0]?.name,
              },
           ]
         : [];

   return (
      <>
         <div id={styles.ct}>
            <DestaqueCard
               titulo={"Artistas Semelhantes"}
               conteudo={conteudoSemelhantes}
               acao={() => {
                  navegar("#artistas-semelhantes");
               }}
            />
            <DestaqueCard
               acao={() => {
                  navegar("/feed");
               }}
               titulo={"Feito para si"}
               conteudo={conteudoPlaylistsDestacadas}
            />
            <DestaqueCard
               acao={() => {
                  navegar("/destaque");
               }}
               titulo={"Lançamentos"}
               conteudo={conteudoLancamentos}
            />
         </div>

         <div id={styles.ctMobile}>
            <Swiper
               grabCursor={true}
               slidesPerView={"auto"}
               spaceBetween={"20px"}
               navigation={true}
               modules={[Navigation]}
               className="swiperDestaques"
            >
               <SwiperSlide>
                  <DestaqueCard
                     titulo={"Artistas Semelhantes"}
                     conteudo={conteudoSemelhantes}
                     acao={() => {
                        navegar("#artistas-semelhantes");
                     }}
                  />
               </SwiperSlide>
               <SwiperSlide>
                  <DestaqueCard
                     acao={() => {
                        navegar("/feed");
                     }}
                     titulo={"Feito para si"}
                     conteudo={conteudoPlaylistsDestacadas}
                  />
               </SwiperSlide>
               <SwiperSlide className="lastSlide">
                  <DestaqueCard
                     acao={() => {
                        navegar("/destaque");
                     }}
                     titulo={"Lançamentos"}
                     conteudo={conteudoLancamentos}
                  />
               </SwiperSlide>
            </Swiper>
         </div>
      </>
   );
};

export default DestaquesContainer;
