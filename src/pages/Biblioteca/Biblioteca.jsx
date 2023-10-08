import React, { useContext, useEffect, useState } from "react";
import styles from "./Biblioteca.module.css";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { musicContext } from "../../App";

const token = localStorage.getItem("token");

const Biblioteca = () => {
   // Apanhando os estados do contexto no reducer
   const { estado, dispatch } = useContext(musicContext);

   const navegar = useNavigate();

   // Apanhando as playlists do usuário
   async function apanharPlaylists() {
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
         });
   }

   useEffect(() => {
      if (estado?.aSeguir?.length === 0) {
         apanharPlaylists();
      } else {
         return;
      }
   }, [estado.aSeguir]);

   return (
      <div id={styles.container}>
         {estado.playlists?.map((v, k) => {
            return (
               <div
                  onClick={() => {
                     dispatch({ type: "setIdAlbum", payload: v.id });
                     dispatch({ type: "setTargetAtual", payload: 0 });
                     navegar("/leitor");
                  }}
                  key={k}
                  onMouseEnter={(e) => {
                     e.target.classList.add(styles.hover);
                  }}
                  onMouseLeave={(e) => {
                     e.target.classList.remove(styles.hover);
                  }}
               >
                  <img src={v.images[0]?.url} alt="" />
                  <h6>{v.name}</h6>
                  <p>{v.tracks.total} musicas</p>
                  <i>
                     <TbPlayerPlayFilled />
                  </i>
               </div>
            );
         })}
      </div>
   );
};

export default Biblioteca;
