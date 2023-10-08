import React, { useContext, useEffect } from "react";
import styles from "./Leitor.module.css";
import AlbumContainer from "../../components/AlbumContainer/AlbumContainer";
import FilaContainer from "../../components/FilaContainer/FilaContainer";
import { musicContext } from "../../App";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";

const token = localStorage.getItem("token");

const Leitor = () => {
   const { estado, dispatch } = useContext(musicContext);

   // Apanhando os itens da playslist
   async function apanhar(id) {
      const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=10`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            dispatch({ type: "setMusicaAtual", payload: [res.items[0]] });
            dispatch({ type: "setaSeguir", payload: res.items });
            if (res.error) {
               if (res.error.message === "The access token expired") {
                  localStorage.clear();
               }
            }
         });
   }

   useEffect(() => {
      if (estado.idAlbum.length > 0) apanhar(estado.idAlbum);
   }, [estado.idAlbum]);

   return (
      <div id={styles.cont}>
         <div id={styles.left}>
            <AudioPlayer />
         </div>

         <div id={styles.right}>
            <AlbumContainer track={estado?.musicaAtual[0]?.track} />
            <FilaContainer fila={estado.aSeguir} />
         </div>
      </div>
   );
};

export default Leitor;
