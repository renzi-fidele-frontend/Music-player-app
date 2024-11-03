import styles from "./AlbumCard.module.css";
import { TbPlayerPlayFilled } from "react-icons/tb";
import Esqueleto from "../Skeletons/Esqueleto";
import { reduzir } from "../../utils/reduzirTexto";
import Tooltip from "../Tooltip/Tooltip";

// varientes são: normal, swiper

// TODO: Adicionar loading a imagem caso não esteja 100% carregado

const AlbumCard = ({ foto, nome, subtit, acao, variante = "normal" }) => {
   return (
      <Tooltip tipo="light" conteudo={nome}>
         <div className={`${styles.box} ${variante === "swiper" && styles.boxSwiper}`} onClick={acao}>
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
      </Tooltip>
   );
};

export default AlbumCard;
