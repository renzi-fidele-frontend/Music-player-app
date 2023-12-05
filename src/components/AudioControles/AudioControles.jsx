import React, { useContext, useState } from "react";
import styles from "./AudioControles.module.css";

// React icons
import { BsShuffle, BsFillPauseFill, BsFillSkipEndFill, BsFillSkipStartFill, BsRepeat, BsFillPlayFill } from "react-icons/bs";
import { musicContext } from "../../App";

const AudioControles = () => {
   const { estado, dispatch } = useContext(musicContext);

   const [loopAtivo, setLoopAtivo] = useState(estado.audioRef.loop);

   function playPause() {
      if (estado.audioRef.src.length > 0) {
         if (estado.isPlaying === false) {
            estado.audioRef?.play().then(() => {
               dispatch({ type: "setisPlaying", payload: true });
            });
         } else {
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
      dispatch({ type: "setisPlaying", payload: false });
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
      console.log(estado.audioRef.loop);
      estado.audioRef.loop = !estado.audioRef.loop;
      setLoopAtivo(estado.audioRef.loop);
   }

   return (
      <div id={styles.cont}>
         <BsShuffle title="Aleatório" />
         <BsFillSkipStartFill title="Voltar" onClick={voltar} />
         {estado.isPlaying === true ? (
            <BsFillPauseFill title="Pausar" onClick={playPause} className={styles.meio} />
         ) : (
            <BsFillPlayFill
               title="Tocar"
               onClick={() => {
                  playPause();
               }}
               className={styles.meio}
            />
         )}
         <BsFillSkipEndFill title="Saltar" onClick={saltar} />

         <BsRepeat title="Repetir" className={estado.audioRef.loop === true ? styles.ativo : undefined} onClick={switchRepetir} />
      </div>
   );
};

export default AudioControles;
