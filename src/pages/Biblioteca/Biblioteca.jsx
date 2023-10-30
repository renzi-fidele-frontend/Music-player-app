import React, { useContext, useEffect } from "react";
import styles from "./Biblioteca.module.css";
import { useNavigate } from "react-router-dom";
import { musicContext } from "../../App";
import AlbumCard from "../../components/AlbumCard/AlbumCard";

const token = localStorage.getItem("token");

const Biblioteca = () => {
   // Apanhando os estados do contexto no reducer
   const { estado, dispatch } = useContext(musicContext);

   const navegar = useNavigate();

   // Apanhando as playlists do usuário
   async function apanharPlaylists() {
      const res = await fetch(`https://api.spotify.com/v1/me/playlists?limit=10`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            if (res.error) {
               if (res.error.message === "The access token expired") {
                  localStorage.clear();
               }
            }
            dispatch({ type: "setPlaylists", payload: res.items });
         });
   }

   useEffect(() => {
      if (estado?.aSeguir?.length === 0 && estado.idAlbum.length === 0) {
         apanharPlaylists();
      } else {
         return;
      }
   }, []);

   return (
      <div id={styles.container}>
         <h2 className={styles.tit1}>{`Playlists criadas (${estado.playlists?.length})`}</h2>
         <div id={styles.baixo}>
            {estado.playlists?.map((v, k) => {
               return (
                  <AlbumCard
                     foto={v.images[0]?.url}
                     nome={v.name}
                     subtit={v.tracks.total === 1 ? `1 Música` : `${v.tracks.total} Músicas`}
                     key={k}
                     acao={() => {
                        dispatch({ type: "setIdPlaylist", payload: v.id });
                        dispatch({ type: "setIdAlbum", payload: "" });
                        dispatch({ type: "setTargetAtual", payload: 0 });
                        dispatch({ type: "setMode", payload: "playlistMode" });
                     }}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default Biblioteca;
