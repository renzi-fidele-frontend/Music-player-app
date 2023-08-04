import React, { useEffect, useState } from "react";
import styles from "./Biblioteca.module.css";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const token = localStorage.getItem("token");

const Biblioteca = () => {
   const [playlists, setPlaylists] = useState(null);
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
            setPlaylists(res.items);
         });
   }

   useEffect(() => {
      apanharPlaylists();
   }, []);

   return (
      <div id={styles.container}>
         {playlists?.map((v, k) => {
            return (
               <div
                  onClick={() => {
                     navegar("/leitor", { state: { id: v.id } });
                  }}
                  key={k}
                  onMouseEnter={(e) => {
                     e.target.classList.add(styles.hover);
                  }}
                  onMouseLeave={(e) => {
                     e.target.classList.remove(styles.hover);
                  }}
               >
                  <img src={v.images[1].url} alt="" />
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
