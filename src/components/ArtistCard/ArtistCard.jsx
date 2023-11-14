import React from "react";
import styles from "./ArtistCard.module.css";

const ArtistCard = ({ foto, nome }) => {
   return (
      <div id={styles.ct}>
         <img src={foto} alt={`foto de ${nome}`} />
         <p>{nome}</p>
      </div>
   );
};

export default ArtistCard;
