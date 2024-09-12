import { useEffect, useState } from "react";
import styles from "./Biblioteca.module.css";
import { useNavigate } from "react-router-dom";

import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";

const token = localStorage.getItem("token");

const Biblioteca = () => {
   const { t } = useTranslation();
   // Apanhando os estados do contexto no reducer
   const { estado, dispatch } = MusicValue();

   const [loading, setLoading] = useState(false);

   const navegar = useNavigate();

   // Apanhando as playlists do usuário
   async function apanharPlaylists() {
      setLoading(true);
      const res = await fetch(`https://api.spotify.com/v1/me/playlists?limit=10`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            if (res.error) {
               if (res.error.message === "The access token expired") {
                  localStorage.clear();
               }
            }
            dispatch({ type: "setPlaylists", payload: res.items });
            setLoading(false);
         });
   }

   useEffect(() => {
      if (estado.playlists.length === 0) {
         apanharPlaylists();
      }
   }, []);

   return (
      <div id={styles.ct}>
         <h2 className={styles.tit1}>{`${t("pages.biblioteca.tit")} (${estado.playlists?.length})`}</h2>
         <div id={styles.baixo}>
            {loading === false ? (
               estado.playlists?.map((v, k) => {
                  return (
                     <AlbumCard
                        foto={v.images[0]?.url}
                        nome={v.name}
                        subtit={
                           v.tracks.total === 1
                              ? `1 ${t("pages.biblioteca.albumCard.one")}`
                              : `${v.tracks.total} ${t("pages.biblioteca.albumCard.many")}`
                        }
                        key={k}
                        acao={() => {
                           dispatch({ type: "setIdPlaylist", payload: v.id });
                           dispatch({ type: "setIdAlbum", payload: "" });
                           dispatch({ type: "setTargetAtual", payload: 0 });
                           dispatch({ type: "setMode", payload: "playlistMode" });
                           dispatch({ type: "setSingleMode", payload: false });
                           navegar("/leitor");
                        }}
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
      </div>
   );
};

export default Biblioteca;
