import React from "react";
import styles from "./DestaqueCard.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { reduzir } from "../AlbumCard/AlbumCard";
import Esqueleto from "../Skeletons/Esqueleto";

const DestaqueCard = ({ titulo, conteudo = [], acao }) => {
   return (
      <div
         onClick={acao}
         id={styles.ct}
         onMouseEnter={(e) => e.target.classList.add(styles.entrou)}
         onMouseLeave={(e) => e.target.classList.remove(styles.entrou)}
      >
         <h6>{titulo}</h6>
         <div id={styles.dentro}>
            {conteudo[0]?.subtit?.length > 0 ? (
               conteudo?.map((v, key) => {
                  return (
                     <div key={key}>
                        <div id={styles.left}>
                           <img src={v.img} alt="foto de destaque" />
                        </div>
                        <div id={styles.right}>
                           <h5>{reduzir(v.subtit, 22)}</h5>
                           <p>{v.texto}</p>
                        </div>
                     </div>
                  );
               })
            ) : (
               <>
                  <div style={{ gap: "1em" }}>
                     <div style={{ width: "20%" }} id={styles.left}>
                        <Esqueleto tipo={"imgPeq"} />
                     </div>
                     <div style={{ width: "100%" }} id={styles.right}>
                        <Esqueleto tipo="titulo" />
                        <Esqueleto tipo="texto" />
                     </div>
                  </div>
                  <div style={{ gap: "1em" }}>
                     <div style={{ width: "20%" }} id={styles.left}>
                        <Esqueleto tipo={"imgPeq"} />
                     </div>
                     <div style={{ width: "100%" }} id={styles.right}>
                        <Esqueleto tipo="titulo" />
                        <Esqueleto tipo="texto" />
                     </div>
                  </div>
                  <div style={{ gap: "1em" }}>
                     <div style={{ width: "20%" }} id={styles.left}>
                        <Esqueleto tipo={"imgPeq"} />
                     </div>
                     <div style={{ width: "100%" }} id={styles.right}>
                        <Esqueleto tipo="titulo" />
                        <Esqueleto tipo="texto" />
                     </div>
                  </div>
               </>
            )}
         </div>
         <IoIosArrowForward />
      </div>
   );
};

export default DestaqueCard;
