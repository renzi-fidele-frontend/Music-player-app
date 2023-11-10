import React, { useContext, useEffect, useState } from "react";
import styles from "./Destaque.module.css";
import { musicContext } from "../../App";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";

const token = localStorage.getItem("token");

const Destaque = () => {
   // Apanhando os estados do contexto no reducer
   const { estado, dispatch } = useContext(musicContext);

   const [loading, setLoading] = useState(false);

   async function getLancamentos() {
      setLoading(true);
      const res = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=10`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((v) => v.json())
         .then((v) => {
            dispatch({ type: "setLancamentos", payload: v.albums.items });
            setLoading(false)
         })
         .catch((err) => console.log("Aconteceu o erro"));
   }

   useEffect(() => {
      if (estado.lancamentos.length === 0) {
         getLancamentos();
      }
   }, [estado.lancamentos]);

   return (
      <div id={styles.ct}>
         <ControlledSwiper tit={"Álbums em destaque"} arr={estado.lancamentos} />
         {/*<h2 className={estiloBiblioteca.tit1}>Músicas em destaque</h2>*/}
      </div>
   );
};

export default Destaque;
