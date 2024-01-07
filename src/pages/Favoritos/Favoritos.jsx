import React, { useContext, useEffect, useState } from "react";
import styles from "./Favoritos.module.css";
import estiloBiblioteca from "../Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";
import { useNavigate } from "react-router-dom";
import AlbumCard from "../../components/AlbumCard/AlbumCard";

const token = localStorage.getItem("token");

const Favoritos = () => {
   const { estado, dispatch } = useContext(musicContext);

   const [loading, setLoading] = useState(false);

   const navegar = useNavigate();

   // Apanhando os favoritos da api
   async function getAlbumsSalvos() {
      setLoading(true);
      const res = await fetch(`https://api.spotify.com/v1/me/albums?limit=8`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            dispatch({ type: "setAlbumsSalvos", payload: res.items });
         });
   }
   async function getMusicasCurtidas() {
      const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=8`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            dispatch({ type: "setMusicasCurtidas", payload: res.items });
            setLoading(false);
         });
   }

   useEffect(() => {
      if (estado.albumsSalvos.length === 0) getAlbumsSalvos();
      if (estado.musicasCurtidas.length === 0) getMusicasCurtidas();
   }, []);

   return (
      <div id={styles.ct}>
         <section>
            <h2 className={estiloBiblioteca.tit1}>{`Álbums salvos (${estado.albumsSalvos?.length})`}</h2>
            <div id={estiloBiblioteca.baixo}>
               {loading === false ? (
                  estado.albumsSalvos?.map((v, k) => {
                     return (
                        <AlbumCard
                           acao={() => {
                              dispatch({ type: "setIdAlbum", payload: v.album.id });
                              dispatch({ type: "setIdPlaylist", payload: "" });
                              dispatch({ type: "setTargetAtual", payload: 0 });
                              dispatch({ type: "setaSeguir", payload: v.album.tracks.items.map((v, k) => v.track) });
                              dispatch({ type: "setAlbumAtual", payload: [v.album] });
                              dispatch({ type: "setMode", payload: "albumMode" });
                              navegar("/leitor");
                           }}
                           subtit={v.album.artists[0].name}
                           foto={v.album.images[0].url}
                           nome={v.album.name}
                           key={k}
                        />
                     );
                  })
               ) : (
                  <>
                     <AlbumCard />
                     <AlbumCard />
                     <AlbumCard />
                  </>
               )}
            </div>
         </section>
         <section>
            <h2 className={estiloBiblioteca.tit1}>{`Músicas curtidas (${estado.musicasCurtidas?.length})`}</h2>
            <div id={estiloBiblioteca.baixo}>
               {loading === false ? (
                  estado.musicasCurtidas?.map((v, k) => {
                     return (
                        <AlbumCard
                           acao={() => {
                              dispatch({ type: "setIdAlbum", payload: "" });
                              dispatch({ type: "setIdPlaylist", payload: "" });
                              dispatch({ type: "setTargetAtual", payload: 0 });
                              dispatch({ type: "setaSeguir", payload: [v.track] });
                              dispatch({ type: "setMusicaAtual", payload: [v.track] });
                              dispatch({ type: "setMode", payload: "playlistMode" });
                              dispatch({ type: "setSingleMode", payload: true });
                              navegar("/leitor");
                           }}
                           subtit={v.track.artists[0].name}
                           nome={v.track.name}
                           foto={v.track.album.images[0].url}
                           key={k}
                        />
                     );
                  })
               ) : (
                  <>
                     <AlbumCard />
                     <AlbumCard />
                     <AlbumCard />
                  </>
               )}
            </div>
         </section>
      </div>
   );
};

export default Favoritos;
