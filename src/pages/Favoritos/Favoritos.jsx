import { useEffect } from "react";
import styles from "./Favoritos.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";

import { useNavigate } from "react-router-dom";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";
import useSpotifyApi from "../../hooks/useSpotifyApi";

const Favoritos = () => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();
   const navegar = useNavigate();

   const { apanharDados: getAlbumsSalvos, loading: loadingAlbums } = useSpotifyApi("me/albums?limit=8", "GET", (v) => {
      dispatch({ type: "setAlbumsSalvos", payload: v.items });
   });

   const { apanharDados: getMusicasCurtidas, loading: loadingTracks } = useSpotifyApi("me/tracks?limit=8", "GET", (v) => {
      dispatch({ type: "setMusicasCurtidas", payload: v.items });
   });

   useEffect(() => {
      if (estado?.albumsSalvos?.length === 0) getAlbumsSalvos();
      if (estado?.musicasCurtidas?.length === 0) getMusicasCurtidas();
   }, []);

   return (
      <div id={styles.ct}>
         <section>
            <h2 className={estiloBiblioteca.tit1}>{`${t("pages.favoritos.tit")} (${estado?.albumsSalvos?.length})`}</h2>
            <div id={estiloBiblioteca.baixo}>
               {!loadingAlbums ? (
                  estado.albumsSalvos?.map((v, k) => {
                     return (
                        <AlbumCard
                           acao={() => {
                              dispatch({ type: "setIdAlbum", payload: v.album.id });
                              dispatch({ type: "setIdPlaylist", payload: "" });
                              dispatch({ type: "setTargetAtual", payload: 0 });
                              dispatch({ type: "setaSeguir", payload: v.album.tracks.items.map((v, k) => v.track) });
                              dispatch({ type: "setAlbumAtual", payload: [v.album] });
                              dispatch({ type: "setMode", payload: "albumMode" });
                              navegar("/leitor");
                           }}
                           subtit={v.album.artists[0].name}
                           foto={v.album.images[0].url}
                           nome={v.album.name}
                           key={k}
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
         </section>
         <section>
            <h2 className={estiloBiblioteca.tit1}>{`${t("pages.favoritos.tit2")} (${estado.musicasCurtidas?.length})`}</h2>
            <div id={estiloBiblioteca.baixo}>
               {!loadingTracks ? (
                  estado.musicasCurtidas?.map((v, k) => {
                     return (
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
                           subtit={v.track.artists[0].name}
                           nome={v.track.name}
                           foto={v.track.album.images[0].url}
                           key={k}
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
         </section>
      </div>
   );
};

export default Favoritos;
