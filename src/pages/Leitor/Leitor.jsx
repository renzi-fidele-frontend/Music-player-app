import React, { useContext, useEffect, useState } from "react";
import styles from "./Leitor.module.css";
import { useLocation } from "react-router-dom";
import AlbumContainer from "../../components/AlbumContainer/AlbumContainer";
import FilaContainer from "../../components/FilaContainer/FilaContainer";
import { musicContext } from "../../App";

const token = localStorage.getItem("token");

const Leitor = () => {
   const { estado, dispatch } = useContext(musicContext);

   // Apanhando os itens da playslist
   async function apanhar(id) {
      console.log(`Aqui o token é: ${token}`);
      const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=10`, {
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
            dispatch({ type: "setaSeguir", payload: res.items });
            estado.musicaAtual.length === 0 ? dispatch({ type: "setMusicaAtual", payload: [res.items[0]] }) : undefined;
         });
   }

   useEffect(() => {
      estado.idAlbum ? apanhar(estado.idAlbum) : undefined;
   }, [estado.idAlbum]);

   return (
      <div id={styles.cont}>
         <div id={styles.left}></div>
         <div id={styles.right}>
            <AlbumContainer track={estado?.musicaAtual[0]?.track} />
            <FilaContainer fila={estado.aSeguir} />
         </div>
      </div>
   );
};

export default Leitor;
