import React, { useEffect } from "react";
import styles from "./DestaqueCard.module.css";

const DestaqueCard = ({ titulo, conteudo = [] }) => {
   useEffect(() => {
      console.log(conteudo[0]?.subtit);
   }, [conteudo[0]?.texto]);

   return (
      <div id={styles.ct}>
         <h6>{titulo}</h6>

         {conteudo[0]?.subtit?.length &&
            conteudo?.map((v, key) => {
               return (
                  <div>
                     <div id={styles.left}>
                        <img src={v.img} alt="foto de destaque" />
                     </div>
                     <div id={styles.right}>
                        <h5>{v.subtit}</h5>
                        <p>{v.texto}</p>
                     </div>
                  </div>
               );
            })}
      </div>
   );
};

export default DestaqueCard;
