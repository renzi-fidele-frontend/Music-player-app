import React, { useContext, useEffect } from "react";
import styles from "./Feed.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";

const token = localStorage.getItem("token");

const Feed = () => {
   const { estado, dispatch } = useContext(musicContext);

   async function getArtistasTop() {
      const res = await fetch(`https://api.spotify.com/v1/me/top/artists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            console.log(res);
            dispatch({ type: "setArtistasTop", payload: res.items });
         })
         .catch((err) => console.log(err));
   }

   useEffect(() => {
      if (estado.artistasTop.length === 0) getArtistasTop();
   }, [estado.artistasTop]);

   return (
      <div id={styles.ct}>
         <h2 className={estiloBiblioteca.tit1}>{`Artistas Top`}</h2>
      </div>
   );
};

export default Feed;
