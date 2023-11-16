import React from "react";
import styles from "./ArtistCard.module.css";
import Esqueleto from "../Skeletons/Esqueleto";

const ArtistCard = ({ foto, nome }) => {
   return (
      <div id={styles.ct}>
         {foto && nome ? (
            <>
               <img src={foto} alt={`foto de ${nome}`} />
               <p>{nome}</p>
            </>
         ) : (
            <>
               <Esqueleto tipo={"imgCircular"} />
               <Esqueleto tipo={"texto"}/> 
            </>
         )}
      </div>
   );
};

export default ArtistCard;
