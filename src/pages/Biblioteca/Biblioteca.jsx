import React, { useEffect } from "react";
import styles from "./Biblioteca.module.css";

const token = localStorage.getItem("token");

const Biblioteca = () => {
  

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
            console.log(res);
         });
   }

   useEffect(() => {
      apanharPlaylists();
   }, []);

   return (
      <div id={styles.container}>
         <div></div>
      </div>
   );
};

export default Biblioteca;
