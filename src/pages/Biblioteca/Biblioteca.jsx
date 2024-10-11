import { useEffect } from "react";
import styles from "./Biblioteca.module.css";
import { useNavigate } from "react-router-dom";

import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";
import useSpotifyApi from "../../hooks/useSpotifyApi";

const Biblioteca = () => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();
   const navegar = useNavigate();

   const { apanharDados: getPlaylistsDoUsuario, loading } = useSpotifyApi("me/playlists?limit=10", "GET", (v) => {
      dispatch({ type: "setPlaylists", payload: v.items });
   });

   useEffect(() => {
      if (estado?.playlists?.length === 0) {
         getPlaylistsDoUsuario();
      }
   }, [estado?.playlists]);

   return (
      <div id={styles.ct}>
         <h2 className={styles.tit1}>{`${t("pages.biblioteca.tit")} (${estado.playlists?.length})`}</h2>
         <div id={styles.baixo}>
            {loading === false ? (
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
