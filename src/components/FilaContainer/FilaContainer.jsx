import styles from "./FilaContainer.module.css";

import { reduzir } from "../../hooks/useReduzir";
import { IoMdCloseCircle, IoMdHeart } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";
const token = localStorage.getItem("token");

const FilaContainer = ({ fila, propRef, playlistId }) => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();
   const [playlistFavorita, setPlaylistFavorita] = useState(null);
   // Convertendo millisegundos para minutos
   function converter(millis) {
      let minutos = Math.floor(millis / 60000);
      let segundos = ((millis % 60000) / 1000).toFixed(0);
      return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
   }

   useEffect(() => {
      console.log(playlistId);
      async function checkIsFollowing() {
         const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            method: "GET",
         })
            .then((v) => v.json())
            .then((data) => console.log(data[0]))
            .catch((err) => console.log(err));
      }
      checkIsFollowing();
   }, [playlistId]);

   async function guardarPlaylist() {
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "PUT",
      })
         .then(() => {
            setPlaylistFavorita(true);
         })
         .catch((err) => console.log(err.message));
   }

   async function removerPlaylist() {
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "DELETE",
      })
         .then(() => {
            setPlaylistFavorita(false);
            
         })
         .catch((err) => console.log(err.message));
   }

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
                           <span>{converter(v?.track?.duration_ms)}</span>
                        </>
                     )}
                     {estado.mode === "albumMode" && (
                        <>
                           <p title={v?.name}>{reduzir(v?.name, 35)}</p>
                           <span>{converter(v?.duration_ms)}</span>
                        </>
                     )}
                     {estado.mode === "playlistMode" && estado.singleMode === true && (
                        <>
                           <p title={v?.name}>{reduzir(v?.name, 35)}</p>
                           <span>{converter(v?.duration_ms)}</span>
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
