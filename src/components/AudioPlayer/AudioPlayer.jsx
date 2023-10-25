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

   const existe = estado.audioRef?.attributes?.src?.value;

   // Duração da música atual
   const duracao = useRef();

   // Controlador da duracao
   useEffect(() => {
      if (estado.audioRef?.duration > 0) {
         duracao.current = estado.audioRef?.duration;
         console.log(converterSecs(duracao.current));
      }
   }, [estado.audioRef?.duration]);

   // Caso nenhuma música esteja tocando e nehuma url valida sido entregue ao Audio
   useEffect(() => {
      if (estado.aSeguir.length > 0) {
         if (estado.isPlaying === false && estado.targetAtual === 0 && (existe === undefined || existe === "undefined")) {
            // Selecionando a primeria musica da playlist
            estado.audioRef.src = prevLink;
         }
      }
   }, [estado.aSeguir]);

   // Caso uma nova musica seja selecionada
   useEffect(() => {
      console.log(linkAudio);
      if (/*linkAudio !== null && */ estado.audioRef.src !== linkAudio) {
         estado.audioRef.src = linkAudio;
      }
   }, [estado.musicaAtual]);

   // Percentagem atual da música sendo tocada
   const percentagem = duracao ? (estado.progresso / duracao) * 100 : 0;

   // Convertendo millisegundos para minutos
   function converter(millis) {
      let minutos = Math.floor(millis / 60000);
      let segundos = ((millis % 60000) / 1000).toFixed(0);
      return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
   }

   // Convertendo segundos para minutos
   function converterSecs(secs) {
      let minutos = Math.floor(secs / 600);
      let segundos = (secs % 600).toFixed(0);
      return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
   }

   function saltar() {
      dispatch({ type: "setTargetAtual", payload: estado.musicaAtual + 1 });
      dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[estado.musicaAtual + 1]] });
   }

   const intervaloRef = useRef();

   function startTimer() {
      clearInterval(intervaloRef.current);
      intervaloRef.current = setInterval(() => {
         if (audioRef.current.ended) {
            saltar();
         } else {
            dispatch({ type: "setTempoAtual", payload: estado.audioRef.currentTime });
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
               <p>{converterSecs(duracao.current)}</p>
            </div>
            <AudioControles />
         </div>
      </div>
   );
};

export default AudioPlayer;
