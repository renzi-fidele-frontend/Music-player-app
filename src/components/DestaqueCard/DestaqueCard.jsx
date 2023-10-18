import React from "react";
import styles from "./DestaqueCard.module.css";

const DestaqueCard = ({ titulo, conteudo }) => {
   return (
      <div id={styles.ct}>
         <h6>{titulo}</h6>
         <div>
            <div id={styles.left}>
               <img src="" alt="foto de destaque" />
            </div>
            <div id={styles.right}>
               <h5>{conteudo}</h5>
               <p>{conteudo}</p>
            </div>
         </div>
         <div>
            <div id={styles.left}>
               <img src="" alt="foto de destaque" />
            </div>
            <div id={styles.right}>
               <h5>{conteudo}</h5>
               <p>{conteudo}</p>
            </div>
         </div>
         <div>
            <div id={styles.left}>
               <img src="" alt="foto de destaque" />
            </div>
            <div id={styles.right}>
               <h5>{conteudo}</h5>
               <p>{conteudo}</p>
            </div>
         </div>
      </div>
   );
};

export default DestaqueCard;
