import React, { useContext, useEffect, useRef } from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";
import { musicContext } from "../../App";
import AudioControles from "../AudioControles/AudioControles";
import Notificacao from "../Notificacao/Notificacao";

const AudioPlayer = () => {
   const { estado, dispatch } = useContext(musicContext);

   // Link da música atual sendo tocada
   const linkAudio = estado.aSeguir[estado.targetAtual]?.track?.preview_url;

   // Link da primeira música da playslist selecionada
   const prevLink = estado.aSeguir[0]?.track?.preview_url;

   // Caso nenhuma música esteja tocando e nehuma url sido entregue ao Audio
   useEffect(() => {
      if (estado.aSeguir.length > 0) {
         let existe = estado.audioRef?.attributes?.src?.value;
         if (estado.isPlaying === false && (existe === undefined || existe === "undefined")) {
            // Referência do áudio que será inicializado
            console.log("Primeira da playlist foi adicionada");
            console.log(prevLink);
            console.log(estado.aSeguir[0]);
            estado.audioRef.src = prevLink;
            console.log(estado.audioRef);
         }
      }
   }, [estado.aSeguir]);

   const intervaloRef = useRef();

   const isReady = useRef(false);

   // Duração atual da música
   const duracao = estado.audioRef?.duration;

   // Percentagem atual da música sendo tocada
   const percentagem = duracao ? (estado.progresso / duracao) * 100 : 0;

   // Convertendo millisegundos para minutos
   function converter(millis) {
      let minutos = Math.floor(millis / 60000);
      let segundos = ((millis % 60000) / 1000).toFixed(0);
      return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
   }

   function saltar() {
      dispatch({ type: "setTargetAtual", payload: estado.musicaAtual + 1 });
      dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[estado.musicaAtual + 1]] });
   }

   function startTimer() {
      clearInterval(intervaloRef.current);
      intervaloRef.current = setInterval(() => {
         if (audioRef.current.ended) {
            saltar();
         } else {
            dispatch({ type: "setTempoAtual", payload: audioRef.current.currentTime });
         }
      }, [1000]);
   }

   // Controlador de play e pouse
   /*useEffect(() => {
      if (estado.isPlaying === true) {
         estado.audioRef.src = linkAudio;
         estado.audioRef.play();
      } else {
         clearInterval(intervaloRef.current);
         estado.audioRef.pause();
      }
   }, [estado.isPlaying]);*/

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
            <Notificacao />
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
               <p>{converter(estado.audioRef?.duration)}</p>
            </div>
            <AudioControles />
         </div>
      </div>
   );
};

export default AudioPlayer;
