import React from "react";
import styles from "./AlbumCard.module.css";
import { TbPlayerPlayFilled } from "react-icons/tb";
import Esqueleto from "../Skeletons/Esqueleto";
import { reduzir } from "../../hooks/useReduzir";


const AlbumCard = ({ foto, nome, subtit, acao }) => {
   return (
      <div title={nome} className={styles.box} onClick={acao}>
         {foto && nome && subtit ? (
            <>
               <img loading="lazy" src={foto} alt="Imagem do album" />
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
