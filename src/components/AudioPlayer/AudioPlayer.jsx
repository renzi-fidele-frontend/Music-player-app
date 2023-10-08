import React, { useContext, useEffect, useRef } from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";
import { musicContext } from "../../App";
import AudioControles from "../AudioControles/AudioControles";

const AudioPlayer = () => {
   const { estado, dispatch } = useContext(musicContext);

   // Link da música atual sendo tocada
   const linkAudio = estado?.aSeguir?.[estado.targetAtual]?.track?.preview_url;

   const audioRef = useRef(new Audio(estado?.aSeguir?.[0]?.track?.preview_url));

   // Convertendo millisegundos para minutos
   function converter(millis) {
      let minutos = Math.floor(millis / 60000);
      let segundos = ((millis % 60000) / 1000).toFixed(0);
      return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
   }

   function tocar() {
      dispatch({ type: "setisPlaying", payload: true });
      audioRef.current.play();
   }

   function pausar() {
      dispatch({ type: "setisPlaying", payload: false });
      audioRef.current.pause();
   }

   function saltar() {
      if (estado.musicaAtual + 1 < estado.aSeguir.length) {
         dispatch({ type: "setTargetAtual", payload: estado.musicaAtual + 1 });
      } else {
         return;
      }
   }

   function voltar() {
      if (estado.musicaAtual + 1 < estado.aSeguir.length) {
         dispatch({ type: "setTargetAtual", payload: estado.musicaAtual + 1 });
      } else {
         return;
      }
   }

   function switchRepetir() {
      dispatch({ type: "setRepetir", payload: !estado.repetir });
   }

   function atualizarPercentagem() {
      dispatch({ type: "setTempoAtual", payload: audioRef.current.currentTime });
   }

   useEffect(() => {
      console.log(linkAudio);
   }, []);

   return (
      <div id={styles.cont}>
         <div id={styles.left}>
            <AudioProgress
               foto={estado?.musicaAtual[0]?.track?.album?.images[0]?.url}
               size={300}
               isPlaying={true}
               cor={"var(--cor-tema)"}
               percentagem={estado.progresso}
            />
         </div>
         <div id={styles.right}>
            <h5>{estado.musicaAtual[0]?.track?.name}</h5>
            <h4>{`${estado.musicaAtual[0]?.track?.album?.artists?.map((v) => v.name).join(" e ")}`}</h4>

            <div id={styles.detalhes}>
               <p>{converter(estado.tempoAtual)}</p>
               <lottie-player
                  class="lottie"
                  src="https://lottie.host/19cf84dd-29ff-45ff-848d-6348925d9877/ISHIZTFG2V.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  direction="1"
                  mode="bounce"
               ></lottie-player>
               <p>{converter(estado.musicaAtual[0]?.track?.duration_ms)}</p>
            </div>
            <AudioControles />
         </div>
      </div>
   );
};

export default AudioPlayer;
