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
   const linkPrevia = () => {
      if (estado.mode === "playlistMode" && !estado.singleMode) {
         return !!estado.musicaAtual[0]?.track?.preview_url;
      } else if (estado.mode === "albumMode" || (estado.mode === "playlistMode" && estado.singleMode)) {
         return !!estado.musicaAtual[0]?.preview_url;
      }
   };

   return (
      <div id={styles.cont}>
         <Tooltip conteudo={t("comps.controles.0")}>
            <i>
               <BsShuffle
                  className={`${estado.aleatorio && styles.ativo} ${estado?.aSeguir?.length === 1 && styles.not}`}
                  onClick={estado?.aSeguir?.length > 1 && switchAleatorio}
               />
            </i>
         </Tooltip>

         <Tooltip conteudo={t("comps.controles.1")}>
            <i>
               <BsFillSkipStartFill className={estado?.aSeguir?.length === 1 && styles.not} onClick={estado?.aSeguir?.length > 1 && voltar} />
            </i>
         </Tooltip>

         {estado.isPlaying === true ? (
            <Tooltip conteudo={t("comps.controles.2")}>
               <i>
                  <BsFillPauseFill onClick={linkPrevia() && playPause} className={styles.meio + ` ${!linkPrevia() && styles.not}`} />
               </i>
            </Tooltip>
         ) : (
            <Tooltip conteudo={t("comps.controles.3")}>
               <i>
                  <BsFillPlayFill onClick={linkPrevia() && playPause} className={styles.meio + ` ${!linkPrevia() && styles.not}`} />
               </i>
            </Tooltip>
         )}

         <Tooltip conteudo={t("comps.controles.4")}>
            <i>
               <BsFillSkipEndFill className={estado?.aSeguir?.length === 1 && styles.not} onClick={estado?.aSeguir?.length > 1 && saltar} />
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
