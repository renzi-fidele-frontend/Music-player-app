import React, { useContext, useEffect } from "react";
import styles from "./Feed.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";
import { FaSearch } from "react-icons/fa";

const token = localStorage.getItem("token");

const Feed = () => {
   const { estado, dispatch } = useContext(musicContext);

   return (
      <div id={styles.ct}>
         <div id={styles.left}>
            <div id={styles.search}>
               <input type="text" name="pesquisa" id={styles.search} placeholder="Busque qualquer coisa" />
               <button>
                  <FaSearch />
               </button>
            </div>
            <section>
               <h2 className={estiloBiblioteca.tit1}>Feito para si</h2>
            </section>
            <section>
               <div id={styles.left}>
                  <h2 className={estiloBiblioteca.tit1}>Escute as melhores músicas de seus artistas favoritos</h2>
               </div>
               <div id={styles.right}></div>
            </section>
         </div>
         <div id={styles.right}></div>
      </div>
   );
};

export default Feed;
