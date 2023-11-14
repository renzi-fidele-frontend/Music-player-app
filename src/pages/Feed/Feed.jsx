import React, { useContext, useEffect } from "react";
import styles from "./Feed.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";

const token = localStorage.getItem("token");

const Feed = () => {
   const { estado, dispatch } = useContext(musicContext);


   return (
      <div id={styles.ct}>
         <h2 className={estiloBiblioteca.tit1}>{`Artistas Top`}</h2>
      </div>
   );
};

export default Feed;
