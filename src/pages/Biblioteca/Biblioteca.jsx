import { useEffect } from "react";
import styles from "./Biblioteca.module.css";
import { useNavigate } from "react-router-dom";

import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";
import useSpotifyApi from "../../hooks/useSpotifyApi";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";

const Biblioteca = () => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();
   const navegar = useNavigate();

   const { apanharDados: getPlaylistsDoUsuario, loadingPlaylists } = useSpotifyApi("me/playlists?limit=10", "GET", (v) => {
      dispatch({ type: "setPlaylists", payload: v.items });
   });

   const { apanharDados: getArtistasSeguidos } = useSpotifyApi("me/following?type=artist", "GET", (v) => {
      dispatch({ type: "setArtistasSeguidos", payload: v?.artists?.items });
   });

   useEffect(() => {
      if (estado?.playlists?.length === 0) {
         getPlaylistsDoUsuario();
      }

      if (estado?.artistasSeguidos?.length === 0) getArtistasSeguidos();
   }, [estado?.playlists]);

   return (
      <div id={styles.ct}>
         {/*  Artistas */}
         <div id={styles.artistCt}>
            <ControlledSwiper tit="Artistas seguidos" modo="artist" arr={estado?.artistasSeguidos} />
         </div>

         <h2 className={styles.tit1}>{`${t("pages.biblioteca.tit")} (${estado.playlists?.length})`}</h2>
         <div id={styles.baixo}>
            {!loadingPlaylists ? (
               estado.playlists?.map((v, k) => {
                  return (
                     <AlbumCard
                        foto={v.images[0]?.url}
                        nome={v.name}
                        subtit={
                           v.tracks.total === 1
                              ? `1 ${t("pages.biblioteca.albumCard.one")}`
                              : `${v.tracks.total} ${t("pages.biblioteca.albumCard.many")}`
                        }
                        key={k}
                        acao={() => {
                           dispatch({ type: "setIdPlaylist", payload: v.id });
                           dispatch({ type: "setIdAlbum", payload: "" });
                           dispatch({ type: "setTargetAtual", payload: 0 });
                           dispatch({ type: "setMode", payload: "playlistMode" });
                           dispatch({ type: "setSingleMode", payload: false });
                           navegar("/leitor");
                        }}
                     />
                  );
               })
            ) : (
               <>
                  <AlbumCard />
                  <AlbumCard />
                  <AlbumCard />
               </>
            )}
         </div>
      </div>
   );
};

export default Biblioteca;
