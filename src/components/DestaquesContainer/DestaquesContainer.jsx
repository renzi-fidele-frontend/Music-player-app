import styles from "./DestaquesContainer.module.css";
import DestaqueCard from "../../components/DestaqueCard/DestaqueCard";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./swiperDestaques.css";

// SwiperJs
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";

const DestaquesContainer = () => {
   const { t } = useTranslation();
   const { estado } = MusicValue();

   const navegar = useNavigate();

   // Conteúdo dos cards de destaques
   const conteudoSemelhantes = [
      {
         img: estado?.semelhantes[0]?.images[2]?.url,
         subtit: estado?.semelhantes[0]?.name,
         texto: `${estado?.semelhantes[0]?.followers?.total} ${t("pages.leitor.followers")}`,
      },
      {
         img: estado?.semelhantes[1]?.images[2]?.url,
         subtit: estado?.semelhantes[1]?.name,
         texto: `${estado?.semelhantes[1]?.followers?.total} ${t("pages.leitor.followers")}`,
      },
      {
         img: estado?.semelhantes[2]?.images[2]?.url,
         subtit: estado?.semelhantes[2]?.name,
         texto: `${estado?.semelhantes[2]?.followers?.total} ${t("pages.leitor.followers")}`,
      },
   ];
   const conteudoPlaylistsDestacadas = [
      {
         img: estado?.playlistsDestacadas[0]?.images[0]?.url,
         subtit: estado?.playlistsDestacadas[0]?.name,
         texto: `${estado?.playlistsDestacadas[0]?.tracks?.total} ${t("pages.leitor.musics")}`,
      },
      {
         img: estado?.playlistsDestacadas[1]?.images[0]?.url,
         subtit: estado?.playlistsDestacadas[1]?.name,
         texto: `${estado?.playlistsDestacadas[1]?.tracks?.total} ${t("pages.leitor.musics")}`,
      },
      {
         img: estado?.playlistsDestacadas[2]?.images[0]?.url,
         subtit: estado?.playlistsDestacadas[2]?.name,
         texto: `${estado?.playlistsDestacadas[2]?.tracks?.total} ${t("pages.leitor.musics")}`,
      },
   ];
   const conteudoLancamentos = [
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
   ];

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
                     titulo={t("pages.leitor.destaqueCard.0")}
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
                     titulo={t("pages.leitor.destaqueCard.1")}
                     conteudo={conteudoPlaylistsDestacadas}
                  />
               </SwiperSlide>
               <SwiperSlide className="lastSlide">
                  <DestaqueCard
                     acao={() => {
                        navegar("/destaque");
                     }}
                     titulo={t("pages.leitor.destaqueCard.2")}
                     conteudo={conteudoLancamentos}
                  />
               </SwiperSlide>
            </Swiper>
         </div>
      </>
   );
};

export default DestaquesContainer;
