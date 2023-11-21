import React, { useContext, useEffect, useState } from "react";
import styles from "./Feed.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";
import { FaSearch } from "react-icons/fa";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";
import Esqueleto from "../../components/Skeletons/Esqueleto";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const Feed = () => {
   const { estado, dispatch } = useContext(musicContext);

   // Apanhando os top artistas
   async function getArtistasTop() {
      const res = await fetch(`https://api.spotify.com/v1/me/top/artists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            dispatch({ type: "setArtistasTop", payload: res.items });
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
      const res = await fetch(`https://api.spotify.com/v1/browse/categories`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            dispatch({ type: "setCategorias", payload: res.categories.items });
         })
         .catch((err) => console.log(err));
   }

   // Apanhando a playlist da categoria selecionada
   async function getCategoriaPlaylist(id) {
      const res = await fetch(`https://api.spotify.com/v1/browse/categories/{category_id}/playlists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            console.log(res.categories.items);
            dispatch({ type: "setCategorias", payload: res.categories.items });
         })
         .catch((err) => console.log(err));
   }

   //
   useEffect(() => {
      if (estado.artistasTop.length === 0) getArtistasTop();
      if (estado.playlistsDestacadas.length === 0) getPlaylistsDestacadas();
      if (estado.categorias.length === 0) getCategorias();
   }, []);

   const navegar = useNavigate();

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
                  {estado.artistasTop.length > 0 ? (
                     estado.artistasTop?.map((v, k) => {
                        return (
                           <ArtistCard
                              acao={() => {
                                 dispatch({ type: "setMode", payload: "playlistMode" });
                                 dispatch({ type: "setIdPlaylist", payload: "" });
                                 dispatch({ type: "setTargetAtual", payload: 0 });
                                 dispatch({ type: "setIdAlbum", payload: "" });
                                 dispatch({ type: "setSingleMode", payload: true });
                                 navegar("/leitor", { state: { idArtistaFavorito: v.id } });
                              }}
                              key={k}
                              foto={v.images[2]?.url}
                              nome={v.name}
                           />
                        );
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

            <section style={{ marginBottom: "0px" }}>
               <ControlledSwiper modo={"playlist"} arr={estado.playlistsDestacadas} tit={"Feito para si"} />
            </section>
         </div>
         <div id={styles.right}>
            <h2 className={estiloBiblioteca.tit1}>{`Categorias (${estado.categorias.length})`}</h2>
            <div id={styles.categsCt}>
               {estado.categorias.length > 0 ? (
                  estado.categorias.map((v, k) => {
                     return (
                        <div
                           onClick={() => {
                              navegar("/leitor", { state: { mode: "categoriaMode", id: v.id } });
                           }}
                           className={styles.categCard}
                        >
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
