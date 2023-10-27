import React, { useContext, useEffect } from "react";
import styles from "./Favoritos.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";
import { useNavigate } from "react-router-dom";
import AlbumCard from "../../components/AlbumCard/AlbumCard";

const token = localStorage.getItem("token");

const Favoritos = () => {
   const { estado, dispatch } = useContext(musicContext);

   const navegar = useNavigate();

   async function getAlbumsSalvos() {
      const res = await fetch(`https://api.spotify.com/v1/me/albums?limit=8`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            console.log(res);
            dispatch({ type: "setAlbumsSalvos", payload: res.items });
         });
   }
   async function getMusicasCurtidas() {
      const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=8`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            console.log(res);
            dispatch({ type: "setMusicasCurtidas", payload: res.items });
         });
   }
   useEffect(() => {
      if (estado.albumsSalvos.length === 0) getAlbumsSalvos();
      if (estado.musicasCurtidas.length === 0) getMusicasCurtidas();
   }, []);

   return (
      <div id={styles.container}>
         <section>
            <h2 className={estiloBiblioteca.tit1}>{`Álbums salvos (${estado.albumsSalvos?.length})`}</h2>
            <div id={estiloBiblioteca.baixo}>
               {estado.albumsSalvos?.map((v, k) => {
                  return <AlbumCard foto={v.album.images[0].url} nome={v.album.name} key={k} />;
               })}
            </div>
         </section>
         <section>
            <h2 className={estiloBiblioteca.tit1}>{`Músicas curtidas (${estado.musicasCurtidas?.length})`}</h2>
            <div id={estiloBiblioteca.baixo}>
               {estado.musicasCurtidas?.map((v, k) => {
                  return <AlbumCard nome={v.track.name} foto={v.track.album.images[0].url} />;
               })}
            </div>
         </section>
      </div>
   );
};

export default Favoritos;
