import React, { useContext, useEffect } from "react";
import styles from "./Leitor.module.css";
import AlbumContainer from "../../components/AlbumContainer/AlbumContainer";
import FilaContainer from "../../components/FilaContainer/FilaContainer";
import { musicContext } from "../../App";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import DestaqueCard from "../../components/DestaqueCard/DestaqueCard";

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

   // Apanhando o conteúdo dos destaques
   async function getSemelhantes(id) {
      console.log("A id é:", id);
      const res = await fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((v) => v.json())
         .then((v) => dispatch({ type: "setSemelhantes", payload: v.artists }));
   }
   
   async function getPlaylistsDestacadas() {
      const res = await fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((v) => v.json())
         .then((v) => dispatch({ type: "setPlaylistsDestacadas", payload: v.playlists.items }));
   }

   useEffect(() => {
      if (estado.idAlbum.length > 0) apanhar(estado.idAlbum);
   }, [estado.idAlbum]);

   useEffect(() => {
      if (estado.semelhantes.length === 0 && estado.playlistsDestacadas.length === 0 && estado.musicaAtual.length > 0) {
         getSemelhantes(estado.musicaAtual[0]?.track?.artists[0]?.id);
         getPlaylistsDestacadas();
      }
   }, [estado.musicaAtual]);

   return (
      <div id={styles.cont}>
         <div id={styles.left}>
            <AudioPlayer />
            <div id={styles.destaques}>
               <DestaqueCard titulo={"Artistas Semelhantes"} />
               <DestaqueCard titulo={"Feito para si"} />
               <DestaqueCard titulo={"Lançamentos"} />
            </div>
         </div>

         <div id={styles.right}>
            <AlbumContainer track={estado?.musicaAtual[0]?.track} />
            <FilaContainer fila={estado.aSeguir} />
         </div>
      </div>
   );
};

export default Leitor;
