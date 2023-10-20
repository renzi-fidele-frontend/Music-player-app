import React, { useContext, useEffect } from "react";
import styles from "./AudioControles.module.css";

// React icons
import { BsShuffle, BsFillPauseFill, BsFillSkipEndFill, BsFillSkipStartFill, BsRepeat, BsFillPlayFill } from "react-icons/bs";
import { musicContext } from "../../App";

const AudioControles = () => {
   const { estado, dispatch } = useContext(musicContext);

   function playPause() {
      if (estado.audioRef !== null) {
         dispatch({ type: "setisPlaying", payload: !estado.isPlaying });
         estado.audioRef?.play().then(() => {
            console.log("Play iniciado");
         });
      }
   }

   function saltar() {
      if (estado.targetAtual + 1 < estado.aSeguir.length) {
         dispatch({ type: "setTargetAtual", payload: estado.targetAtual + 1 });
         dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[estado.targetAtual + 1]] });
      } else {
         dispatch({ type: "setTargetAtual", payload: 0 });
         dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[0]] });
      }
   }

   function voltar() {
      if (estado.targetAtual - 1 > 0) {
         dispatch({ type: "setTargetAtual", payload: estado.targetAtual - 1 });
         dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[estado.targetAtual - 1]] });
      } else {
         dispatch({ type: "setTargetAtual", payload: 0 });
         dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[0]] });
      }
   }

   function switchRepetir() {
      dispatch({ type: "setRepetir", payload: !estado.repetir });
   }

   useEffect(() => {
      console.log("Preview: ", estado.musicaAtual[0]?.track?.preview_url);
      if (estado.musicaAtual[0]?.track?.preview_url === undefined) {
         const my_notification = new NotificationJS({
            message: "A música selecionada não possúi prévia", //specify message here
            type: "alert", //specify type of notification
            duration: 5000, //duration in milliseconds
            theme: "dark", //theme of notification
            sound: true, //for notificaion sound
            disable_timer: false, //if you don't want timer then set it true
         });

         my_notification.show();
      }
   }, [estado.targetAtual]);

   return (
      <div id={styles.cont}>
         <BsShuffle />
         <BsFillSkipStartFill onClick={voltar} />
         {estado.isPlaying === true ? (
            <BsFillPauseFill onClick={playPause} className={styles.meio} />
         ) : (
            <BsFillPlayFill onClick={playPause} className={styles.meio} />
         )}

         <BsFillSkipEndFill onClick={saltar} />
         <BsRepeat onClick={switchRepetir} />
      </div>
   );
};

export default AudioControles;
