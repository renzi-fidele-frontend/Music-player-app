import React from "react";
import styles from "./AlbumCard.module.css";
import { TbPlayerPlayFilled } from "react-icons/tb";

const AlbumCard = ({ foto, nome, subtit, acao }) => {
   //  Reduzindo o texto do conteúdo do post
   function reduzir(str, maxlength) {
      return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
   }

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
         <h6>{reduzir(nome, 17)}</h6>
         <p>{subtit}</p>

         <i>
            <TbPlayerPlayFilled />
         </i>
      </div>
   );
};

export default AlbumCard;
