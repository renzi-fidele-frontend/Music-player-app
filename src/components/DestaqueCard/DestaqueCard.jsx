import React from "react";
import styles from "./DestaqueCard.module.css";
import { IoIosArrowForward } from "react-icons/io";

const DestaqueCard = ({ titulo, conteudo = [] }) => {
   return (
      <div id={styles.ct} onMouseEnter={(e) => e.target.classList.add(styles.entrou)} onMouseLeave={(e) => e.target.classList.remove(styles.entrou)}>
         <h6>{titulo}</h6>
         <div id={styles.dentro}>
            {conteudo[0]?.subtit?.length &&
               conteudo?.map((v, key) => {
                  return (
                     <div key={key}>
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
         <IoIosArrowForward />
      </div>
   );
};

export default DestaqueCard;
