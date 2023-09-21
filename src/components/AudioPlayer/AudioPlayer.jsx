import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";
import { musicContext } from "../../App";
import AudioControles from "../AudioControles/AudioControles";

const AudioPlayer = () => {
   const { estado, dispatch } = useContext(musicContext);
   const audioRef = useRef(null);

   // Convertendo millisegundos para minutos
   function converter(millis) {
      let minutos = Math.floor(millis / 60000);
      let segundos = ((millis % 60000) / 1000).toFixed(0);
      return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
   }

   function tocar() {
      dispatch({ type: "setisPlaying", payload: true });
   }

   function pausar() {
      dispatch({ type: "setisPlaying", payload: false });
   }

   function saltar() {}

   function voltar() {}

   function switchRepetir() {}

   function atualizarPercentagem() {
      dispatch({ type: "setTempoAtual", payload: audioRef.current.currentTime });
   }

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
               <p>{estado.tempoAtual}</p>
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
