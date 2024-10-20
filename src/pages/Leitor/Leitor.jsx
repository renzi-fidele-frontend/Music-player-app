import { useEffect, useRef } from "react";
import styles from "./Leitor.module.css";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AlbumContainer from "../../components/AlbumContainer/AlbumContainer";
import FilaContainer from "../../components/FilaContainer/FilaContainer";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import DestaquesContainer from "../../components/DestaquesContainer/DestaquesContainer";
import { MusicValue } from "../../context/MusicContext";
import useSpotifyApi from "../../hooks/useSpotifyApi";

// Icones
import { RiPlayList2Fill } from "react-icons/ri";
import { TbInfoSquareRounded } from "react-icons/tb";
import foto from "../../assets/bird.svg";

// TODO: Adicionar tooltip aos elementos do App para melhorar a UX

const Leitor = () => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();
   const loc = useLocation();

   // Requisições
   const { apanharDados: getItemsPlaylists } = useSpotifyApi(`playlists/${estado.idPlaylist}/tracks?limit=10`, "GET", (v) => {
      dispatch({ type: "setaSeguir", payload: v.items });
      dispatch({ type: "setMusicaAtual", payload: [v.items[0]] });
   });
   const { apanharDados: getItemsAlbum } = useSpotifyApi(`albums/${estado.idAlbum}/tracks`, "GET", (v) => {
      dispatch({ type: "setMusicaAtual", payload: [v.items[0]] });
      dispatch({ type: "setaSeguir", payload: v.items });
   });
   const { apanharDados: getArtistTopMusicas } = useSpotifyApi(`artists/${loc.state?.idArtistaFavorito}/top-tracks`, "GET", (v) => {
      dispatch({ type: "setaSeguir", payload: v.tracks });
      dispatch({ type: "setMusicaAtual", payload: [v.tracks[0]] });
   });
   const { apanharDados: getCategoriaItems } = useSpotifyApi(`browse/categories/${loc.state?.id}/playlists`, "GET", (v) => {
      dispatch({ type: "setaSeguir", payload: v?.playlists?.items });
      dispatch({ type: "setMusicaAtual", payload: [v?.playlists?.items[0]] });
   });
   const { apanharDadosComParam: getSemelhantes } = useSpotifyApi(null, "GET", (v) => {
      dispatch({ type: "setSemelhantes", payload: v?.artists });
   });
   const { apanharDados: getLancamentos } = useSpotifyApi("browse/new-releases", "GET", (v) => {
      dispatch({ type: "setLancamentos", payload: v.albums.items });
   });
   const { apanharDados: getPlaylistsDestacadas } = useSpotifyApi("browse/featured-playlists", "GET", (v) => {
      dispatch({ type: "setPlaylistsDestacadas", payload: v.playlists.items });
   });

   useEffect(() => {
      if (estado.idAlbum.length > 0 && estado.targetAtual === 0 && estado.mode === "albumMode") getItemsAlbum();
      if (estado.idPlaylist.length > 0 && estado.targetAtual === 0 && estado.mode === "playlistMode") getItemsPlaylists();
      if (loc.state?.idArtistaFavorito) getArtistTopMusicas();
      // Caso seja passada a id da categoria
      if (loc.state?.mode === "categoriaMode" && estado.targetAtual === 0 && loc.state?.id) getCategoriaItems(loc.state?.id);
   }, [estado.idPlaylist, loc.state]);

   useEffect(() => {
      if (estado.aSeguir.length > 0) {
         if (estado.mode === "playlistMode" && estado.singleMode === false) {
            getSemelhantes(`artists/${estado?.musicaAtual[0]?.track?.artists[0]?.id}/related-artists`);
         } else if (estado.mode === "albumMode") {
            getSemelhantes(`artists/${estado?.albumAtual[0]?.artists[0]?.id}/related-artists`);
         } else if (estado.mode === "playlistMode" && estado.singleMode === true) {
            getSemelhantes(`artists/${estado?.musicaAtual[0]?.artists[0]?.id}/related-artists`);
         }

         // Carregando os dados somente se não tiverem sido carregados
         if (estado.playlistsDestacadas.length === 0 && estado.musicaAtual.length > 0) {
            getPlaylistsDestacadas();
         }
         if (estado.lancamentos.length === 0) getLancamentos();
      }
   }, [estado.musicaAtual]);

   const albumCtRef = useRef(null);
   const filaCtRef = useRef(null);

   return estado.musicaAtual.length > 0 ? (
      <div id={styles.cont}>
         <div id={styles.left}>
            <AudioPlayer />
            <DestaquesContainer />

            <i
               className={styles.iconeDetalhes}
               onClick={() => {
                  albumCtRef.current.classList.add(styles.detalhesAtivo);
               }}
            >
               <TbInfoSquareRounded color="var(--cor-texto2)" />
            </i>

            <i
               className={styles.iconeFila}
               onClick={() => {
                  filaCtRef.current.classList.add(styles.filaAtivo);
               }}
            >
               <RiPlayList2Fill />
            </i>
         </div>
         <div id={styles.right}>
            <AlbumContainer propRef={albumCtRef} track={estado?.musicaAtual[0]?.track} />
            <FilaContainer propRef={filaCtRef} fila={estado.aSeguir} playlistId={estado.mode === "playlistMode" && estado.idPlaylist} />
         </div>
      </div>
   ) : (
      <div id={styles.antes}>
         <img src={foto} alt="Ilustracao" />
         <h2>{t("pages.leitor.noMusic")}</h2>
      </div>
   );
};

export default Leitor;
