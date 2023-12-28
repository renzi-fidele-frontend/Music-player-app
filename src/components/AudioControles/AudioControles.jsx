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
      if (!estado.aleatorio) {
         if (estado.targetAtual + 1 < estado.aSeguir.length) {
            dispatch({ type: "setTargetAtual", payload: estado.targetAtual + 1 });
            dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[estado.targetAtual + 1]] });
         } else {
            dispatch({ type: "setTargetAtual", payload: 0 });
            dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[0]] });
         }
      } else {
         // Gerando posição aleatória nas músicas selecionadas
         let randomIndex = Math.floor(Math.random() * (estado.aSeguir.length));
         if (estado.targetAtual === randomIndex) {
            let otherRandomIndex = Math.floor(Math.random() * (estado.aSeguir.length));
         }
         console.log(randomIndex);
         dispatch({ type: "setTargetAtual", payload: randomIndex });
         dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[randomIndex]] });
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
      estado.audioRef.loop = !estado.audioRef.loop;
      setLoopAtivo(estado.audioRef.loop);
   }

   function switchAleatorio() {
      dispatch({ type: "setAleatorio", payload: !estado.aleatorio });
   }

   return (
      <div id={styles.cont}>
         <BsShuffle title="Aleatório" className={estado.aleatorio === true && styles.ativo} onClick={switchAleatorio} />
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

         <BsRepeat title="Repetir" className={estado.audioRef.loop === true && styles.ativo} onClick={switchRepetir} />
      </div>
   );
};

export default AudioControles;
