import React, { useContext, useEffect, useRef } from "react";
import styles from "./Leitor.module.css";
import AlbumContainer from "../../components/AlbumContainer/AlbumContainer";
import FilaContainer from "../../components/FilaContainer/FilaContainer";
import { musicContext } from "../../App";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import DestaqueCard from "../../components/DestaqueCard/DestaqueCard";

const token = localStorage.getItem("token");

const Leitor = () => {
   const { estado, dispatch } = useContext(musicContext);

   // Apanhando os itens da playslist
   async function apanhar(id) {
      const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=10`, {
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
         });
   }

   // Apanhando o conteúdo dos destaques
   async function getSemelhantes(id) {
      const res = await fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((v) => v.json())
         .then((v) => dispatch({ type: "setSemelhantes", payload: v.artists.slice(0, 3) }));
   }
   async function getPlaylistsDestacadas() {
      const res = await fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((v) => v.json())
         .then((v) => dispatch({ type: "setPlaylistsDestacadas", payload: v.playlists.items.slice(0, 3) }));
   }
   async function getLancamentos() {
      const res = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((v) => v.json())
         .then((v) => dispatch({ type: "setLancamentos", payload: v.albums.items.slice(0, 3) }));
   }

   useEffect(() => {
      if (estado.idAlbum.length > 0) apanhar(estado.idAlbum);
   }, [estado.idAlbum]);

   useEffect(() => {
      getSemelhantes(estado.musicaAtual[0]?.track?.artists[0]?.id);

      if (estado.playlistsDestacadas.length === 0 && estado.musicaAtual.length > 0) {
         getPlaylistsDestacadas();
         getLancamentos();
      }
   }, [estado.musicaAtual]);

   const conteudoSemelhantes = [
      {
         img: estado.semelhantes[0]?.images[2].url,
         subtit: estado.semelhantes[0]?.name,
         texto: `${estado.semelhantes[0]?.followers?.total} Seguidores`,
      },
      {
         img: estado.semelhantes[1]?.images[2].url,
         subtit: estado.semelhantes[1]?.name,
         texto: `${estado.semelhantes[1]?.followers?.total} Seguidores`,
      },
      {
         img: estado.semelhantes[2]?.images[2].url,
         subtit: estado.semelhantes[2]?.name,
         texto: `${estado.semelhantes[2]?.followers?.total} Seguidores`,
      },
   ];

   const conteudoPlaylistsDestacadas = [
      {
         img: estado.playlistsDestacadas[0]?.images[0]?.url,
         subtit: estado.playlistsDestacadas[0]?.name,
         texto: `${estado.playlistsDestacadas[0]?.tracks?.total} Músicas`,
      },
      {
         img: estado.playlistsDestacadas[1]?.images[0]?.url,
         subtit: estado.playlistsDestacadas[1]?.name,
         texto: `${estado.playlistsDestacadas[1]?.tracks?.total} Músicas`,
      },
      {
         img: estado.playlistsDestacadas[2]?.images[0]?.url,
         subtit: estado.playlistsDestacadas[2]?.name,
         texto: `${estado.playlistsDestacadas[2]?.tracks?.total} Músicas`,
      },
   ];

   const conteudoLancamentos = [
      {
         img: estado.lancamentos[0]?.images[2]?.url,
         subtit: estado.lancamentos[0]?.name,
         texto: estado.lancamentos[0]?.artists[0]?.name,
      },
      {
         img: estado.lancamentos[1]?.images[2]?.url,
         subtit: estado.lancamentos[1]?.name,
         texto: estado.lancamentos[1]?.artists[0]?.name,
      },
      {
         img: estado.lancamentos[2]?.images[2]?.url,
         subtit: estado.lancamentos[2]?.name,
         texto: estado.lancamentos[2]?.artists[0]?.name,
      },
   ];

   return (
      <div id={styles.cont}>
         <div id={styles.left}>
            <AudioPlayer />
            <div id={styles.destaques}>
               <DestaqueCard titulo={"Artistas Semelhantes"} conteudo={conteudoSemelhantes} />
               <DestaqueCard titulo={"Feito para si"} conteudo={conteudoPlaylistsDestacadas} />
               <DestaqueCard titulo={"Lançamentos"} conteudo={conteudoLancamentos} />
            </div>
         </div>

         <div id={styles.right}>
            <AlbumContainer track={estado?.musicaAtual[0]?.track} />
            <FilaContainer fila={estado.aSeguir} />
         </div>
      </div>
   );
};

export default Leitor;
