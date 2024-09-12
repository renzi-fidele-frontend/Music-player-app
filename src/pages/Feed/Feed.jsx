import { useEffect, useRef, useState } from "react";
import styles from "./Feed.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";

import { FaSearch } from "react-icons/fa";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";
import Esqueleto from "../../components/Skeletons/Esqueleto";
import { Link, useLocation, useNavigate } from "react-router-dom";
import foto from "../../assets/mulher.png";
import nadaPesquisado from "../../assets/search.svg";
import semArtista from "../../assets/noArtist.png";

// Icones
import { GoSidebarExpand } from "react-icons/go";
import { IoMdCloseCircle } from "react-icons/io";
import { MusicValue } from "../../context/MusicContext";

const token = localStorage.getItem("token");

const Feed = () => {
   const { estado, dispatch } = MusicValue();
   const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
   const [loading, setLoading] = useState(false);
   const [pesquisaFeita, setPesquisaFeita] = useState(false);

   // Apanhando os top artistas
   async function getArtistasTop() {
      const res = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=3`, {
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
         .catch((err) => console.log("Aconteceu o erro", err));
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
            dispatch({ type: "setCategorias", payload: res?.categories?.items });
         })
         .catch((err) => console.log(err));
   }

   // Apanhando a playlist da categoria selecionada
   async function getCategoriaPlaylist(id) {
      setLoadingCategoria(true);
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
            setLoadingCategoria(false);
         })
         .catch((err) => console.log(err));
   }

   useEffect(() => {
      if (!estado.artistasTop) getArtistasTop();
      if (estado.playlistsDestacadas.length === 0) getPlaylistsDestacadas();
      if (estado.categorias.length === 0) getCategorias();
   }, []);

   const categsCtRef = useRef(null);

   //  Apanhando os resultados da pesquisa
   async function pesquisar() {
      if (searchRef.current.value.length > 0) {
         setPesquisaFeita(true);
         setLoading(true);
         navegar("/feed/pesquisa");
         const res = await fetch(`https://api.spotify.com/v1/search?q=${searchRef.current.value}&type=album,track,playlist`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            method: "GET",
         })
            .then((res) => res.json())
            .then((res) => {
               console.log(res);
               setResultadosPesquisa([res]);
               setLoading(false);
            })
            .catch((err) => console.log(err));
      }
   }

   const navegar = useNavigate();
   const loc = useLocation();
   const searchRef = useRef();
   const [loadingCategoria, setLoadingCategoria] = useState(false);

   return (
      <div id={styles.ct}>
         <div id={styles.left}>
            <div id={styles.search}>
               <input
                  onKeyDown={(e) => {
                     if (e.keyCode === 13) pesquisar();
                  }}
                  ref={searchRef}
                  type="text"
                  name="pesquisa"
                  placeholder="Busque qualquer coisa"
               />
               <FaSearch onClick={pesquisar} />
            </div>

            {/* Caso esteja na pagina do feed */}
            {loc.pathname === "/feed" && (
               <>
                  <section>
                     <h2 className={estiloBiblioteca.tit1}>Escute as melhores músicas de seus artistas favoritos</h2>
                     <div id={styles.baixo}>
                        {estado?.artistasTop?.length > 0 &&
                           estado?.artistasTop?.map((v, k) => {
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
                           })}
                        {!estado?.artistasTop && (
                           <div id={styles.esqueleto}>
                              {[1, 2, 3, 4].map((v, k) => {
                                 return <ArtistCard key={k} />;
                              })}
                           </div>
                        )}
                        {estado?.artistasTop?.length === 0 && (
                           <div id={styles.artistCt}>
                              <img id={styles.semArtista} src={semArtista} />
                              Você ainda não possúi artista favorito!
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
                  <ControlledSwiper
                     modo="playlist"
                     arr={!loadingCategoria && estado.playlistsCategoria}
                     tit={`Playlists da categoria: ${loc?.state?.name}`}
                  />
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
            {loc.pathname.includes("/feed/pesquisa") &&
               (pesquisaFeita ? (
                  <>
                     <div id={styles.searchCt}>
                        <h2 className={estiloBiblioteca.tit1}>Resultados da pesquisa</h2>
                        <hr id={styles.barra} />
                        <section>
                           <ControlledSwiper
                              tit={"Músicas"}
                              modo="single"
                              arr={
                                 !loading &&
                                 resultadosPesquisa[0]?.tracks?.items?.map((v) => {
                                    let obj = {
                                       track: v,
                                       id: v.id,
                                    };
                                    return obj;
                                 })
                              }
                           />
                        </section>
                        <section>
                           <ControlledSwiper tit={"Álbuns"} modo="album" arr={!loading && resultadosPesquisa[0]?.albums?.items} />
                        </section>
                        <section>
                           <ControlledSwiper tit={"Playlists"} modo="playlist" arr={!loading && resultadosPesquisa[0]?.playlists?.items} />
                        </section>
                     </div>
                  </>
               ) : (
                  <>
                     <h2 className={estiloBiblioteca.tit1}>Você não pesquisou por nada</h2>
                     <img src={nadaPesquisado} id={styles.ndPesquisado} alt="" />
                  </>
               ))}

            <i
               id={styles.abrirCategs}
               onClick={() => {
                  categsCtRef.current.classList.add(styles.ativo);
               }}
            >
               <GoSidebarExpand color="var(--cor-texto2)" />
            </i>
         </div>
         <div id={styles.right} ref={categsCtRef}>
            <i
               id={styles.botaoFechar}
               onClick={() => {
                  categsCtRef.current.classList.remove(styles.ativo);
               }}
            >
               <IoMdCloseCircle />
            </i>
            <h2 className={estiloBiblioteca.tit1}>{`Categorias (${estado?.categorias?.length})`}</h2>
            <div id={styles.categsCt}>
               {estado?.categorias?.length > 0 ? (
                  estado?.categorias?.map((v, k) => {
                     return (
                        <div
                           key={k}
                           onClick={() => {
                              getCategoriaPlaylist(v.id);
                              navegar(`/feed/categoria`, { state: { name: v.name } });
                           }}
                           className={styles.categCard}
                        >
                           <figure>
                              <img src={v.icons[0].url} alt={`Ilustracao de ${v.name}`} />
                           </figure>

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
