import React, { useContext, useEffect, useState } from "react";
import styles from "./Feed.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";
import { FaSearch } from "react-icons/fa";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import AlbumCard from "../../components/AlbumCard/AlbumCard";

const token = localStorage.getItem("token");

const Feed = () => {
   const { estado, dispatch } = useContext(musicContext);
   const [loading, setLoading] = useState(false);

   // Apanhando os top artistas
   async function getArtistasTop() {
      setLoading(true);
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
            setLoading(false);
         })
         .catch((err) => console.log(err));
   }
   //
   useEffect(() => {
      if (estado.artistasTop.length === 0) getArtistasTop();
   }, []);

   return (
      <div id={styles.ct}>
         <div id={styles.left}>
            <div id={styles.search}>
               <input type="text" name="pesquisa" placeholder="Busque qualquer coisa" />
               <FaSearch />
            </div>

            <section>
               <div id={styles.left}>
                  <h2 className={estiloBiblioteca.tit1}>Escute as melhores músicas de seus artistas favoritos</h2>
                  <div id={styles.baixo}>
                     {loading === false ? (
                        estado.artistasTop?.map((v, k) => {
                           return <ArtistCard key={k} foto={v.images[2]?.url} nome={v.name} />;
                        })
                     ) : (
                        <>
                           <AlbumCard />
                           <AlbumCard />
                           <AlbumCard />
                        </>
                     )}
                  </div>
               </div>
               <div id={styles.right}></div>
            </section>
            <section>
               <h2 className={estiloBiblioteca.tit1}>Feito para si</h2>
            </section>
         </div>
         <div id={styles.right}>
            <h2 className={estiloBiblioteca.tit1}>Categorias</h2>
         </div>
      </div>
   );
};

export default Feed;
