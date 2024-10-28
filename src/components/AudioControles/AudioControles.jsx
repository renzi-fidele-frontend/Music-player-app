import styles from "./AudioControles.module.css";

// React icons
import { BsShuffle, BsFillPauseFill, BsFillSkipEndFill, BsFillSkipStartFill, BsRepeat, BsFillPlayFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";
import useControles from "../../hooks/useControles";
import Tooltip from "../Tooltip/Tooltip";
import { MusicValue } from "../../context/MusicContext";

const AudioControles = () => {
   const { t } = useTranslation();
   const { switchAleatorio, voltar, playPause, saltar, switchRepetir } = useControles();
   const { estado } = MusicValue();

   return (
      <div id={styles.cont}>
         <Tooltip conteudo={t("comps.controles.0")}>
            <i>
               <BsShuffle className={estado.aleatorio && styles.ativo} onClick={switchAleatorio} />
            </i>
         </Tooltip>

         <Tooltip conteudo={t("comps.controles.1")}>
            <i>
               <BsFillSkipStartFill onClick={voltar} />
            </i>
         </Tooltip>

         {estado.isPlaying === true ? (
            <Tooltip conteudo={t("comps.controles.2")}>
               <i>
                  <BsFillPauseFill onClick={playPause} className={styles.meio} />
               </i>
            </Tooltip>
         ) : (
            <Tooltip conteudo={t("comps.controles.3")}>
               <i>
                  <BsFillPlayFill onClick={playPause} className={styles.meio} />
               </i>
            </Tooltip>
         )}

         <Tooltip conteudo={t("comps.controles.4")}>
            <i>
               <BsFillSkipEndFill onClick={saltar} />
            </i>
         </Tooltip>

         <Tooltip conteudo={t("comps.controles.5")}>
            <i>
               <BsRepeat className={estado.repetir && styles.ativo} onClick={switchRepetir} />
            </i>
         </Tooltip>
      </div>
   );
};

export default AudioControles;
