import React from "react";
import styles from "./DestaqueCard.module.css";

const DestaqueCard = ({ titulo, conteudo = [] }) => {
   return (
      <div id={styles.ct}>
         <h6>{titulo}</h6>
         {conteudo?.map(v, (key) => {
            return (
               <div>
                  <div id={styles.left}>
                     <img src={v?.img} alt="foto de destaque" />
                  </div>
                  <div id={styles.right}>
                     <h5>{v?.nomeArtista}</h5>
                     <p>{v?.texto}</p>
                  </div>
               </div>
            );
         })}
      </div>
   );
};

export default DestaqueCard;
