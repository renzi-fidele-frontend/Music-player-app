import React, { useContext, useEffect } from "react";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import styles from "./Destaque.module.css";
import { musicContext } from "../../App";
import AlbumCard from "../../components/AlbumCard/AlbumCard";

const token = localStorage.getItem("token");

const Destaque = () => {
   // Apanhando os estados do contexto no reducer
   const { estado, dispatch } = useContext(musicContext);

   async function getLancamentos() {
      const res = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=10`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((v) => v.json())
         .then((v) => dispatch({ type: "setLancamentos", payload: v.albums.items }))
         .catch((err) => console.log("Aconteceu o erro"));
   }

   useEffect(() => {
      if (estado.lancamentos.length === 0) {
         getLancamentos();
      }
   }, [estado.lancamentos]);

   return (
      <div>
         <h2 className={estiloBiblioteca.tit1}>Álbums em destaque</h2>
         {estado.lancamentos.length > 0 &&
            estado.lancamentos.map((v, k) => {
               return (
                  <AlbumCard
                     foto={v.images[0]?.url}
                     nome={v.name}
                     subtit={v.total_tracks === 1 ? `1 Música` : `${v.total_tracks} Músicas`}
                     key={k}
                  />
               );
            })}
         <h2 className={estiloBiblioteca.tit1}>Músicas em destaque</h2>
      </div>
   );
};

export default Destaque;
