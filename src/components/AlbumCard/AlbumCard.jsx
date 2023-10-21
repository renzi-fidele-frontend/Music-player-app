import React from "react";
import styles from "./AlbumCard.module.css"
import { TbPlayerPlayFilled } from "react-icons/tb";

const AlbumCard = ({ foto, nome, nrMusicas, acao }) => {
   return (
      <div
         className={styles.box}
         onClick={acao}
         onMouseOver={(e) => {
            e.target.classList.add(styles.hover);
         }}
         onMouseLeave={(e) => {
            e.target.classList.remove(styles.hover);
         }}
         onMouse
      >
         <img src={foto} alt="Imagem do album" />
         <h6>{nome}</h6>
         {nrMusicas === 1 ? <p>{nrMusicas} Música</p> : <p>{nrMusicas} Músicas</p>}

         <i>
            <TbPlayerPlayFilled />
         </i>
      </div>
   );
};

export default AlbumCard;
