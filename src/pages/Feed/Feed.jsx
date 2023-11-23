import React, { useContext, useEffect, useRef } from "react";
import styles from "./Feed.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";
import { FaSearch } from "react-icons/fa";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";
import Esqueleto from "../../components/Skeletons/Esqueleto";
import { Link, useLocation, useNavigate } from "react-router-dom";
import foto from "../../assets/mulher.png";

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
      const res = await fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            console.log();
            dispatch({ type: "setPlaylistsCategoria", payload: res.playlists.items });
         })
         .catch((err) => console.log(err));
   }

   useEffect(() => {
      if (estado.artistasTop.length === 0) getArtistasTop();
      if (estado.playlistsDestacadas.length === 0) getPlaylistsDestacadas();
      if (estado.categorias.length === 0) getCategorias();
      console.log(loc.pathname);
   }, []);

   //  Apanhando os resultados da pesquisa
   async function pesquisar() {
      console.log(`O query é ${searchRef.current.value}`);
      navegar("/feed/pesquisa");
   }

   const navegar = useNavigate();
   const loc = useLocation();
   const searchRef = useRef();

   return (
      <div id={styles.ct}>
         <div id={styles.left}>
            <div id={styles.search}>
               <input ref={searchRef} type="text" name="pesquisa" placeholder="Busque qualquer coisa" />
               <FaSearch onClick={pesquisar} />
            </div>

            {/* Caso esteja na pagina do feed */}
            {loc.pathname === "/feed" && (
               <>
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
               </>
            )}

            {/* Caso esteja na pagina das categorias */}
            {loc.pathname.includes("/feed/categoria") && (
               <section id={styles.categoriaCt}>
                  <ControlledSwiper modo="playlist" arr={estado.playlistsCategoria} tit={`Playlists da categoria: ${loc?.state?.name}`} />
                  <div id={styles.fixo}>
                     <div id={styles.left}>
                        <img src={foto} alt="mulher" />
                     </div>
                     <div id={styles.right}>
                        <h3>Encontre as melhores recomendações no mundo da música </h3>
                        <p>
                           - Feito com carinho por <Link>Renzi Fidele</Link>
                        </p>
                     </div>
                  </div>
               </section>
            )}

            {/* Caso esteja na pagina de pesquisa */}
            {loc.pathname.includes("/feed/pesquisa") && (
               <>
                  <section>
                     <h2 className={estiloBiblioteca.tit1}>Resultados da pesquisa</h2>
                  </section>
               </>
            )}
         </div>
         <div id={styles.right}>
            <h2 className={estiloBiblioteca.tit1}>{`Categorias (${estado.categorias.length})`}</h2>
            <div id={styles.categsCt}>
               {estado.categorias.length > 0 ? (
                  estado.categorias.map((v, k) => {
                     return (
                        <div
                           onClick={() => {
                              getCategoriaPlaylist(v.id);
                              navegar(`/feed/categoria`, { state: { name: v.name } });
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
