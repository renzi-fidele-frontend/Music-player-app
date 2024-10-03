import styles from "./AudioControles.module.css";

// React icons
import { BsShuffle, BsFillPauseFill, BsFillSkipEndFill, BsFillSkipStartFill, BsRepeat, BsFillPlayFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";
import useControles from "../../hooks/useControles";

const AudioControles = () => {
   const { t } = useTranslation();
   const { switchAleatorio, voltar, playPause, saltar, switchRepetir, estado } = useControles();

   return (
      <div id={styles.cont}>
         <BsShuffle title={t("comps.controles.0")} className={estado.aleatorio === true && styles.ativo} onClick={switchAleatorio} />
         <BsFillSkipStartFill title={t("comps.controles.1")} onClick={voltar} />
         {estado.isPlaying === true ? (
            <BsFillPauseFill title={t("comps.controles.2")} onClick={playPause} className={styles.meio} />
         ) : (
            <BsFillPlayFill title={t("comps.controles.3")} onClick={playPause} className={styles.meio} />
         )}
         <BsFillSkipEndFill title={t("comps.controles.4")} onClick={saltar} />

         <BsRepeat title={t("comps.controles.5")} className={estado.audioRef.loop === true && styles.ativo} onClick={switchRepetir} />
      </div>
   );
};

export default AudioControles;
