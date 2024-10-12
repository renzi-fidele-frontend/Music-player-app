import styles from "./FilaContainer.module.css";
import { reduzir } from "../../hooks/useReduzir";
import { IoMdCloseCircle, IoMdHeart } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";
import { milliToMin } from "../../utils/milliToMin";
import useSpotifyApi from "../../hooks/useSpotifyApi";

// TODO: Adicionar feat de gostar/salvar de uma musica
// TODO: Adicionar feat de gostar/salvar de um album

const FilaContainer = ({ fila, propRef, playlistId }) => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();
   const [playlistFavorita, setPlaylistFavorita] = useState(null);

   const { apanharDados: checkIsFollowingPlaylist } = useSpotifyApi(`playlists/${playlistId}/followers/contains`, "GET", (v) => {
      setPlaylistFavorita(v[0]);
   });

   const { apanharDados: checkIsFollowingAlbum } = useSpotifyApi(`me/albums/contains?ids=${estado.idAlbum}`, "GET", (v) => {
      console.log(v);
      setPlaylistFavorita(v[0]);
   });

   const { apanharDados: guardarPlaylist } = useSpotifyApi(`playlists/${playlistId}/followers`, "PUT", () => {
      setPlaylistFavorita(true);
   });

   const { apanharDados: removerPlaylist } = useSpotifyApi(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, "DELETE", () => {
      setPlaylistFavorita(false);
   });

   useEffect(() => {
      if (!estado.singleMode) checkIsFollowingPlaylist();
      if (estado.mode === "albumMode") checkIsFollowingAlbum();
   }, [playlistId]);

   return (
      <div ref={propRef} id={styles.cont}>
         <div className={styles.titCt}>
            <h4>{t("comps.filaCt")}</h4>
            {playlistFavorita ? (
               <IoMdHeart onClick={removerPlaylist} />
            ) : (
               <IoMdHeartEmpty onClick={guardarPlaylist} title="Adicionar aos favoritos" />
            )}
         </div>

         <div className={styles.wrapper}>
            {fila?.map((v, key) => {
               return (
                  <div
                     onClick={() => {
                        dispatch({ type: "setMusicaAtual", payload: [v] });
                        dispatch({ type: "setTargetAtual", payload: key });
                        dispatch({ type: "setisPlaying", payload: false });
                     }}
                     key={key}
                  >
                     {estado.mode === "playlistMode" && estado.singleMode === false && (
                        <>
                           <p title={v?.track?.name}>{reduzir(v?.track?.name, 35)}</p>
                           <span>{milliToMin(v?.track?.duration_ms)}</span>
                        </>
                     )}
                     {estado.mode === "albumMode" && (
                        <>
                           <p title={v?.name}>{reduzir(v?.name, 35)}</p>
                           <span>{milliToMin(v?.duration_ms)}</span>
                        </>
                     )}
                     {estado.mode === "playlistMode" && estado.singleMode === true && (
                        <>
                           <p title={v?.name}>{reduzir(v?.name, 35)}</p>
                           <span>{milliToMin(v?.duration_ms)}</span>
                        </>
                     )}
                  </div>
               );
            })}
         </div>

         {/*Icone de fechar escondido */}
         <i
            id={styles.botaoFechar}
            onClick={() => {
               propRef.current.className = "";
            }}
         >
            <IoMdCloseCircle />
         </i>
      </div>
   );
};

export default FilaContainer;
