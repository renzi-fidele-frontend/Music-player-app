import { useEffect, useRef } from "react";
import styles from "./Leitor.module.css";
import AlbumContainer from "../../components/AlbumContainer/AlbumContainer";
import FilaContainer from "../../components/FilaContainer/FilaContainer";

import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import { useLocation } from "react-router-dom";

// Icones
import { RiPlayList2Fill } from "react-icons/ri";
import { TbInfoSquareRounded } from "react-icons/tb";
import foto from "../../assets/bird.svg";
import DestaquesContainer from "../../components/DestaquesContainer/DestaquesContainer";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";

const token = localStorage.getItem("token");

// TODO: Resetar slider e o progress do Vinyl ao se saltar de música

const Leitor = () => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();

   const loc = useLocation();

   // Apanhando os itens da playslist
   async function getItemsPlaylists(id) {
      if (id.length > 0) {
         const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=10`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            method: "GET",
         })
            .then((res) => res.json())
            .then((res) => {
               dispatch({ type: "setaSeguir", payload: res.items });
               dispatch({ type: "setMusicaAtual", payload: [res.items[0]] });

               if (res.error) {
                  if (res.error.message === "The access token expired") {
                     localStorage.clear();
                  }
               }
            });
      }
   }
   // Apanhando items do album
   async function getItemsAlbum(id) {
      if (id.length > 0) {
         const res = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            method: "GET",
         })
            .then((res) => res.json())
            .then((res) => {
               dispatch({ type: "setMusicaAtual", payload: [res.items[0]] });
               dispatch({ type: "setaSeguir", payload: res.items });
               if (res.error) {
                  if (res.error.message === "The access token expired") {
                     localStorage.clear();
                  }
               }
            })
            .catch((err) => console.log(`Ops, aconteceu o erro ${err}`));
      }
   }

   // Apanhando top musicas do artista favorito
   async function getTopMusicas(id) {
      if (id.length > 0) {
         const res = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            method: "GET",
         })
            .then((res) => res.json())
            .then((res) => {
               dispatch({ type: "setaSeguir", payload: res.tracks });
               dispatch({ type: "setMusicaAtual", payload: [res.tracks[0]] });

               if (res.error) {
                  if (res.error.message === "The access token expired") {
                     localStorage.clear();
                  }
               }
            });
      }
   }

   // Apanhando a playlist da categoria selecionada
   async function getCategoriaItems(id) {
      const res = await fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            console.log(res);
            dispatch({ type: "setaSeguir", payload: res?.playlists?.items });
            dispatch({ type: "setMusicaAtual", payload: [res?.playlists?.items[0]] });
         })
         .catch((err) => console.log(err));
   }

   useEffect(() => {
      // Caso seja passada a id do album
      if (estado.idAlbum.length > 0 && estado.mode === "albumMode") getItemsAlbum(estado.idAlbum);

      // Caso seja passada a id da playlist
      if (estado.idPlaylist.length > 0 && estado.mode === "playlistMode") getItemsPlaylists(estado.idPlaylist);

      // Caso seja passado a id do artista favorito
      if (loc.state?.idArtistaFavorito) getTopMusicas(loc.state?.idArtistaFavorito);

      // Caso seja passada a id da categoria
      if (loc.state?.mode === "categoriaMode" && loc.state?.id) getCategoriaItems(loc.state?.id);
   }, [estado.idPlaylist, loc.state]);

   // Apanhando o conteúdo dos destaques
   async function getSemelhantes(id) {
      if (id && toString(id).length > 0) {
         const res = await fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
            method: "GET",
         })
            .then((v) => v.json())
            .then((v) => dispatch({ type: "setSemelhantes", payload: v?.artists }))
            .catch((err) => console.log("Aconteceu o erro"));
      }
   }
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
   async function getLancamentos() {
      const res = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
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
      if (estado.aSeguir.length > 0) {
         if (estado.mode === "playlistMode" && estado.singleMode === false) {
            getSemelhantes(estado?.musicaAtual[0]?.track?.artists[0]?.id);
         } else if (estado.mode === "albumMode") {
            getSemelhantes(estado?.albumAtual[0]?.artists[0]?.id);
         } else if (estado.mode === "playlistMode" && estado.singleMode === true) {
            try {
               getSemelhantes(estado?.musicaAtual[0]?.artists[0]?.id);
            } catch {
               console.error("Ops, houve erro");
            }
         }

         // Carregando os dados somente se não tiverem sido carregados
         if (estado.playlistsDestacadas.length === 0 && estado.musicaAtual.length > 0) {
            getPlaylistsDestacadas();
         }
         if (estado.lancamentos.length === 0) getLancamentos();
      }
   }, [estado.musicaAtual]);

   const filaCtRef = useRef(null);
   const albumCtRef = useRef(null);

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
