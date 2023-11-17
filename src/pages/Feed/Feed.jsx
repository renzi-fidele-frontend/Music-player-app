import React, { useContext, useEffect, useState } from "react";
import styles from "./Feed.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";
import { FaSearch } from "react-icons/fa";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";
import Esqueleto from "../../components/Skeletons/Esqueleto";

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

   // Apanhando as recomendacoes
   async function getPlaylistsDestacadas() {
      const res = await fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((v) => v.json())
         .then((v) => dispatch({ type: "setPlaylistsDestacadas", payload: v.playlists.items }))
         .catch((err) => console.log("Aconteceu o erro"));
   }

   // Apanhando as categorias
   async function getCategorias() {
      setLoading(true);
      const res = await fetch(`https://api.spotify.com/v1/browse/categories`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            console.log(res.categories.items);
            dispatch({ type: "setCategorias", payload: res.categories.items });
            setLoading(false);
         })
         .catch((err) => console.log(err));
   }

   //
   useEffect(() => {
      if (estado.artistasTop.length === 0) getArtistasTop();
      if (estado.playlistsDestacadas.length === 0) getPlaylistsDestacadas();
      if (estado.categorias.length === 0) getCategorias();
   }, []);

   return (
      <div id={styles.ct}>
         <div id={styles.left}>
            <div id={styles.search}>
               <input type="text" name="pesquisa" placeholder="Busque qualquer coisa" />
               <FaSearch />
            </div>


            <section>
               <h2 className={estiloBiblioteca.tit1}>Escute as melhores músicas de seus artistas favoritos</h2>
               <div id={styles.baixo}>
                  {loading === false ? (
                     estado.artistasTop?.map((v, k) => {
                        return <ArtistCard key={k} foto={v.images[2]?.url} nome={v.name} />;
                     })
                  ) : (
                     <div id={styles.esqueleto}>
                        <ArtistCard />
                        <ArtistCard />
                        <ArtistCard />
                        <ArtistCard />
                     </div>
                  )}
               </div>
            </section>

            <section>
               <ControlledSwiper modo={"playlist"} arr={estado.playlistsDestacadas} tit={"Feito para si"} />
            </section>
         </div>
         <div id={styles.right}>
            <h2 className={estiloBiblioteca.tit1}>Categorias</h2>
            <div id={styles.categsCt}>
               {estado.categorias.length > 0 ? (
                  estado.categorias.map((v, k) => {
                     return (
                        <div className={styles.categCard}>
                           <img src={v.icons[0].url} alt={`Ilustracao de ${v.name}`} />
                           <p>{v.name}</p>
                        </div>
                     );
                  })
               ) : (
                  <>
                     <Esqueleto tipo={"categoriaBox"} />
                     <Esqueleto tipo={"categoriaBox"} />
                     <Esqueleto tipo={"categoriaBox"} />
                     <Esqueleto tipo={"categoriaBox"} />
                     <Esqueleto tipo={"categoriaBox"} />
                     <Esqueleto tipo={"categoriaBox"} />
                     <Esqueleto tipo={"categoriaBox"} />
                     <Esqueleto tipo={"categoriaBox"} />
               </>
               )}
            </div>
         </div>
      </div>
   );
};

export default Feed;
