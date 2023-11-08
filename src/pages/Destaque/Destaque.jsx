import React, { useContext, useEffect } from "react";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import styles from "./Destaque.module.css";
import { musicContext } from "../../App";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";

// Icons
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSwiper } from "swiper/react";

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
      <div id={styles.ct}>
         <div id={styles.linha}>
            <h2 className={estiloBiblioteca.tit1}>Álbums em destaque</h2>
            <div id={styles.botoes}>
               <MdNavigateBefore />
               <MdNavigateNext  onClick={()=> swiperHook.slideNext()}/>
            </div>
         </div>

         <ControlledSwiper arr={estado.lancamentos} />
         <h2 className={estiloBiblioteca.tit1}>Músicas em destaque</h2>
      </div>
   );
};

export default Destaque;
