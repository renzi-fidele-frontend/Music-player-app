import React, { useContext, useEffect, useState } from "react";
import styles from "./Destaque.module.css";
import { musicContext } from "../../App";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";

const token = localStorage.getItem("token");

const Destaque = () => {
   // Apanhando os estados do contexto no reducer
   const { estado, dispatch } = useContext(musicContext);

   async function getLancamentos() {
      const res = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=30`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((v) => v.json())
         .then((v) => {
            dispatch({ type: "setLancamentos", payload: v.albums.items });
         })
         .catch((err) => console.log("Aconteceu o erro"));
   }

   // Apanhando os itens da playslist
   async function getTop50() {
      const res = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=50`, {
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
            dispatch({ type: "setTop50", payload: res.items });
         })
         .catch((err) => console.log(`Ops, aconteceu erro ${err} ao apanhar os top 50`));
   }
   useEffect(() => {
      if (estado.lancamentos.length === 0) {
         getLancamentos();
      }

      if (estado.top50.length === 0) getTop50();
   }, [estado.lancamentos && estado.top50]);

   return (
      <div id={styles.ct}>
         <section>
            <ControlledSwiper tit={"Novos lançamentos"} modo={"album"} arr={estado.lancamentos} />
         </section>
         <section>
            <ControlledSwiper tit={"Top 50 músicas - Global"} arr={estado.top50} modo={"playlist"} />
         </section>

         {/*<h2 className={estiloBiblioteca.tit1}>Músicas em destaque</h2>*/}
      </div>
   );
};

export default Destaque;
