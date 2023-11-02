import React, { useContext } from "react";
import styles from "./AudioControles.module.css";

// React icons
import { BsShuffle, BsFillPauseFill, BsFillSkipEndFill, BsFillSkipStartFill, BsRepeat, BsFillPlayFill } from "react-icons/bs";
import { musicContext } from "../../App";

const AudioControles = () => {
   const { estado, dispatch } = useContext(musicContext);

   function playPause() {
      if (estado.audioRef.src.length > 0) {
         if (estado.isPlaying === false) {
            estado.audioRef?.play().then(() => {
               dispatch({ type: "setisPlaying", payload: true });
            });
         } else {
            console.log("Passei");
            estado.audioRef?.pause();
            dispatch({ type: "setisPlaying", payload: false });
         }
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
      dispatch({type: "setisPlaying", payload: false})
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

   return (
      <div id={styles.cont}>
         <BsShuffle />
         <BsFillSkipStartFill onClick={voltar} />
         {estado.isPlaying === true ? (
            <BsFillPauseFill onClick={playPause} className={styles.meio} />
         ) : (
            <BsFillPlayFill
               onClick={() => {
                  console.log(estado.audioRef);
                  playPause();
               }}
               className={styles.meio}
            />
         )}
         <BsFillSkipEndFill onClick={saltar} />
         <BsRepeat onClick={switchRepetir} />
      </div>
   );
};

export default AudioControles;
