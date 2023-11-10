import React from "react";
import styles from "./AlbumCard.module.css";
import { TbPlayerPlayFilled } from "react-icons/tb";
import Esqueleto from "../Skeletons/Esqueleto";

//  Reduzindo o texto do conteúdo do post
export function reduzir(str, maxlength) {
   return str.length > maxlength ? str?.slice(0, maxlength - 1) + "…" : str;
}

const AlbumCard = ({ foto="", nome="", subtit="", acao }) => {
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
         {foto.length > 0 && nome.length > 0 && subtit.length > 0 ? (
            <>
               <img src={foto} alt="Imagem do album" />
               <h6>{reduzir(nome, 17)}</h6>
               <p>{subtit}</p>
               <i>
                  <TbPlayerPlayFilled />
               </i>
            </>
         ) : (
            <>
               <Esqueleto tipo={"albumCard"} />
               <Esqueleto tipo={"titulo"} />
               <Esqueleto tipo={"texto"} />
            </>
         )}
      </div>
   );
};

export default AlbumCard;
