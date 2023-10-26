import React, { useContext, useEffect } from "react";
import styles from "./Favoritos.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const Favoritos = () => {
   // Apanhando os estados do contexto no reducer
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
            dispatch({type: "setAlbumsSalvos", payload: res.items})
         });

      return undefined;
   }
   async function getMusicasCurtidas() {
      return undefined;
   }

   useEffect(() => {
      getAlbumsSalvos();
   }, []);

   return (
      <div id={styles.container}>
         <section>
            <h2 className={estiloBiblioteca.tit1}>Álbums salvos</h2>
            <div id={estiloBiblioteca.baixo}></div>
         </section>
         <section>
            <h2 className={estiloBiblioteca.tit1}>Músicas curtidas</h2>

            <div id={estiloBiblioteca.baixo}></div>
         </section>
      </div>
   );
};

export default Favoritos;
