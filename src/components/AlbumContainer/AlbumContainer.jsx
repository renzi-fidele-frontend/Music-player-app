import React, { useEffect } from "react";
import styles from "./AlbumContainer.module.css";

const AlbumContainer = ({ track }) => {
   useEffect(() => {
      console.log(track?.album);
   }, [track]);

   return (
      <div id={styles.cont}>
         <img src={track?.album.images[0].url} alt="Imagem do albúm" />
         <h5>{track?.album.name}</h5>
         <p>{`${track?.album.name} é um álbum de ${track?.album.artists?.map((v) => v.name).join(" e ")}, que possui ${
            track?.album.total_tracks
         } música(s)`}</p>
         <span>{`Lançado em: ${track?.album.release_date}`}</span>
      </div>
   );
};

export default AlbumContainer;
