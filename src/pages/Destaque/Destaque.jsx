import { useEffect } from "react";
import styles from "./Destaque.module.css";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";
import { MusicValue } from "../../context/MusicContext";
import { useTranslation } from "react-i18next";
import useSpotifyApi from "../../hooks/useSpotifyApi";

// TODO: Adicionar scrollbar pois nos laptops não transmite boa UX

const Destaque = () => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();

   const { apanharDados: getLancamentos } = useSpotifyApi("browse/new-releases?limit=30", "GET", (v) => {
      dispatch({ type: "setLancamentos", payload: v.albums.items });
   });

   const { apanharDados: getTop50 } = useSpotifyApi("playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=50", "GET", (v) => {
      dispatch({ type: "setTop50", payload: v.items });
   });

   useEffect(() => {
      if (estado?.lancamentos?.length === 0) {
         getLancamentos();
      }

      if (estado?.top50?.length === 0) getTop50();
   }, [estado?.lancamentos, estado?.top50]);

   return (
      <div id={styles.ct}>
         <section>
            <ControlledSwiper tit={t("pages.destaque.tit1")} modo={"album"} arr={estado?.lancamentos} />
         </section>
         <section>
            <ControlledSwiper tit={t("pages.destaque.tit2")} arr={estado?.top50} modo={"single"} />
         </section>
      </div>
   );
};

export default Destaque;
