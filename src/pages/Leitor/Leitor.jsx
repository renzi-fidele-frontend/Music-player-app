import React, { useEffect, useState } from "react";
import styles from "./Leitor.module.css";
import { useLocation } from "react-router-dom";

const token = localStorage.getItem("token");

const Leitor = () => {
   const estado = useLocation().state;
   const [musicaAtual, setMusicaAtual] = useState({});
   const [items, setItems] = useState(null);
   const [targetAtual, setTargetAtual] = useState(0);

   // Apanhando os itens da playslist
   async function apanhar(id) {
      console.log(`Aqui o token é: ${token}`);
      const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=10`, {
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
            setItems(res.items);
            setMusicaAtual(res.items[0].track);
            console.log(res.items);
         });
   }

   useEffect(() => {
      estado ? apanhar(estado.id) : undefined;
   }, [estado]);

   return (
      <div id={styles.container}>
         <p>pe</p>
      </div>
   );
};

export default Leitor;
