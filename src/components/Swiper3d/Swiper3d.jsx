import styles from "./Swiper3d.module.css";
import "./styles.css";
import ArtistCard from "../ArtistCard/ArtistCard";

import { useNavigate } from "react-router-dom";

// SwiperJs
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MusicValue } from "../../context/MusicContext";

const Swiper3d = ({ arr = [] }) => {
   const { dispatch } = MusicValue();
   const navegar = useNavigate();

   return (
      <div id={styles.ct}>
         <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            pagination={(true, { type: "progressbar" })}
            spaceBetween={"30px"}
            navigation={true}
            autoplay={{ pauseOnMouseEnter: false, disableOnInteraction: false }}
            modules={[Autoplay, Pagination, Navigation]}
            className="swiper3d"
            breakpoints={{ 250: { slidesPerView: 1 }, 400: { slidesPerView: 2 }, 900: { slidesPerView: 3 }, 1500: { slidesPerView: "auto" } }}
         >
            {arr.map((v, key) => {
               return (
                  <SwiperSlide key={key} className={styles.slide}>
                     {v?.images[1]?.url && <ArtistCard idArtista={v?.id} nome={v?.name} foto={v?.images[1]?.url} alt="Imagem do slide" />}
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
