import { useEffect, useRef, useState } from "react";
import styles from "./Feed.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { MusicValue } from "../../context/MusicContext";
import { useTranslation } from "react-i18next";
import useSpotifyApi from "../../hooks/useSpotifyApi";
import ArtistCard from "../../components/ArtistCard/ArtistCard";
import ControlledSwiper from "../../components/ControlledSwiper/ControlledSwiper";
import Esqueleto from "../../components/Skeletons/Esqueleto";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Assets
import { FaSearch } from "react-icons/fa";
import { GoSidebarExpand } from "react-icons/go";
import { IoMdCloseCircle } from "react-icons/io";
import foto from "../../assets/mulher.png";
import nadaPesquisado from "../../assets/search.svg";
import semArtista from "../../assets/noArtist.png";
import logo from "../../assets/logo_desktop.png";

const Feed = () => {
   const { t } = useTranslation();
   const navegar = useNavigate();
   const loc = useLocation();
   const { estado, dispatch } = MusicValue();
   const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
   const [pesquisaFeita, setPesquisaFeita] = useState(false);
   const categsCtRef = useRef(null);
   const searchRef = useRef();

   // Requisições
   const { apanharDados: getArtistasTop } = useSpotifyApi("me/top/artists?limit=3", "GET", (v) => {
      dispatch({ type: "setArtistasTop", payload: v.items });
   });
   const { apanharDados: getPlaylistsDestacadas } = useSpotifyApi("browse/featured-playlists", "GET", (v) => {
      dispatch({ type: "setPlaylistsDestacadas", payload: v.playlists.items });
   });
   const { apanharDados: getCategorias } = useSpotifyApi("browse/categories", "GET", (v) => {
      dispatch({ type: "setCategorias", payload: v?.categories?.items });
   });
   const { apanharDadosComParam: getCategoriaPlaylist, loading: loadingCategoria } = useSpotifyApi(null, "GET", (v) => {
      dispatch({ type: "setPlaylistsCategoria", payload: v.playlists.items });
   });
   const { apanharDadosComParam: pesquisar, loading: loadingPesquisa } = useSpotifyApi(null, "GET", (v) => {
      setResultadosPesquisa([v]);
   });

   useEffect(() => {
      if (!estado?.artistasTop) getArtistasTop();
      if (estado?.playlistsDestacadas?.length === 0) getPlaylistsDestacadas();
      if (estado?.categorias?.length === 0) getCategorias();
   }, []);

   return (
      <div id={styles.ct}>
         <div id={styles.left}>
            <div id={styles.search}>
               <img style={{ cursor: "pointer" }} onClick={() => navegar("/feed")} src={logo} alt="Logo do site" />
               <div>
                  <input
                     onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                           if (searchRef.current.value.length > 0) {
                              setPesquisaFeita(true);
                              navegar("/feed/pesquisa");
                              pesquisar(`search?q=${searchRef.current.value}&type=album,track,playlist,artist`);
                           }
                        }
                     }}
                     ref={searchRef}
                     type="text"
                     name="pesquisa"
                     placeholder={t("pages.feed.placeholder")}
                  />
                  <FaSearch
                     onClick={() => {
                        if (searchRef.current.value.length > 0) {
                           setPesquisaFeita(true);
                           navegar("/feed/pesquisa");
                           pesquisar(`search?q=${searchRef.current.value}&type=album,track,playlist,artist`);
                        }
                     }}
                  />
               </div>
            </div>

            {/* Caso esteja na pagina do feed */}
            {loc.pathname === "/feed" && (
               <>
                  <section>
                     <h2 className={estiloBiblioteca.tit1}>{t("pages.feed.tit1")}</h2>
                     <div id={styles.baixo}>
                        {estado?.artistasTop?.length > 0 &&
                           estado?.artistasTop?.map((v, k) => {
                              return <ArtistCard idArtista={v?.id} key={k} foto={v.images[2]?.url} nome={v.name} />;
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
                              {t("pages.feed.noArtist")}
                           </div>
                        )}
                     </div>
                  </section>

                  <section style={{ marginBottom: "0px" }}>
                     <ControlledSwiper modo={"playlist"} arr={estado.playlistsDestacadas} tit={t("pages.feed.titRecomended")} />
                  </section>
               </>
            )}

            {/* Caso esteja na pagina das categorias */}
            {loc.pathname.includes("/feed/categoria") && (
               <section id={styles.categoriaCt}>
                  <ControlledSwiper
                     modo="playlist"
                     arr={!loadingCategoria && estado.playlistsCategoria}
                     tit={`${t("pages.feed.titCategory")}: ${loc?.state?.name}`}
                  />
                  <div id={styles.fixo}>
                     <div id={styles.left}>
                        <img src={foto} alt="mulher" />
                     </div>
                     <div id={styles.right}>
                        <h3>{t("pages.feed.bannerText")}</h3>
                        <p>
                           - {t("pages.feed.author")} <Link>Renzi Fidele</Link>
                        </p>
                     </div>
                  </div>
               </section>
            )}

            {/* Caso esteja na pagina de pesquisa */}
            {/* TODO: Navegar para página de pesquisa utilizando url param ao invés de state, pois perco o valor ao se retornar para a mesma */}
            {loc.pathname.includes("/feed/pesquisa") &&
               (pesquisaFeita ? (
                  <div id={styles.searchCt}>
                     <h2 className={estiloBiblioteca.tit1}>{t("pages.feed.titSearch")}</h2>
                     <hr id={styles.barra} />
                     <section>
                        {/*  Artistas */}
                        <ControlledSwiper
                           tit={t("pages.feed.titArtists")}
                           modo="artist"
                           arr={!loadingPesquisa && resultadosPesquisa[0]?.artists?.items}
                        />
                     </section>
                     <section>
                        {/*  Músicas */}
                        <ControlledSwiper
                           tit={t("pages.feed.titMusics")}
                           modo="single"
                           arr={
                              !loadingPesquisa &&
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
                        {/*  Albums */}
                        <ControlledSwiper
                           tit={t("pages.feed.titAlbum")}
                           modo="album"
                           arr={!loadingPesquisa && resultadosPesquisa[0]?.albums?.items}
                        />
                     </section>
                     <section>
                        {/*  Playlists */}
                        <ControlledSwiper
                           tit={t("pages.feed.titPlaylist")}
                           modo="playlist"
                           arr={!loadingPesquisa && resultadosPesquisa[0]?.playlists?.items}
                        />
                     </section>
                  </div>
               ) : (
                  <>
                     <h2 className={estiloBiblioteca.tit1}>{t("pages.feed.noSearch")}</h2>
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
         {/* Categorias */}
         <div id={styles.right} ref={categsCtRef}>
            <i
               id={styles.botaoFechar}
               onClick={() => {
                  categsCtRef.current.classList.remove(styles.ativo);
               }}
            >
               <IoMdCloseCircle />
            </i>
            <h2 className={estiloBiblioteca.tit1}>{`${t("pages.feed.categories")} (${estado?.categorias?.length})`}</h2>
            <div id={styles.categsCt}>
               {estado?.categorias?.length > 0 ? (
                  estado?.categorias?.map((v, k) => {
                     return (
                        <div
                           key={k}
                           onClick={() => {
                              getCategoriaPlaylist(`browse/categories/${v.id}/playlists`);
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
