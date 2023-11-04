import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";
import { musicContext } from "../../App";
import AudioControles from "../AudioControles/AudioControles";
import Notificacao from "../Notificacao/Notificacao";

const AudioPlayer = () => {
   const { estado, dispatch } = useContext(musicContext);

   // Link da música atual sendo tocada
   const linkAudio =
      estado.mode === "playlistMode" ? estado.aSeguir[estado.targetAtual]?.track?.preview_url : estado.aSeguir[estado.targetAtual]?.preview_url;

   // Link da primeira música da playslist selecionada
   const prevLink = estado.mode === "playlistMode" ? estado.aSeguir[0]?.track?.preview_url : estado.aSeguir[0]?.preview_url;

   // Valor do src do áudio inicializado
   const existe = estado.audioRef?.attributes?.src?.value;

   // Duração da música atual
   const duracao = estado.audioRef?.duration;

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
      if (estado.audioRef.src !== linkAudio) {
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
      if (estado.targetAtual + 1 < estado.aSeguir.length) {
         dispatch({ type: "setTargetAtual", payload: estado.targetAtual + 1 });
         dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[estado.targetAtual + 1]] });
      } else {
         dispatch({ type: "setTargetAtual", payload: 0 });
         dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[0]] });
      }
   }

   // Tempo de playback da música atual
   const [tempoAtual, setTempoAtual] = useState(estado.audioRef?.currentTime);

   const intervaloRef = useRef();

   // Temporizador do áudio tocando
   function startTimer() {
      clearInterval(intervaloRef.current);
      intervaloRef.current = setInterval(() => {
         if (estado.audioRef?.ended) {
            dispatch({ type: "setisPlaying", payload: false });
            setTempoAtual(0);
            saltar();
         } else {
            setTempoAtual(estado.audioRef?.currentTime);
         }
      }, [1000]);
   }

   // Controlador de play e pouse
   useEffect(() => {
      if (estado.isPlaying === true) {
         startTimer();
      } else {
         clearInterval(intervaloRef.current);
         estado.audioRef.pause();
      }
   }, [estado.isPlaying]);

   return (
      <div id={styles.cont}>
         <div id={styles.left}>
            <AudioProgress
               foto={estado.mode === "playlistMode" ? estado?.musicaAtual[0]?.track?.album?.images[0]?.url : estado.albumAtual[0]?.images[0].url}
               size={300}
               isPlaying={true}
               cor={"var(--cor-tema)"}
               percentagem={estado.progresso}
            />
            <Notificacao />
         </div>
         <div id={styles.right}>
            {estado.mode === "playlistMode" && (
               <>
                  <h5>{estado.musicaAtual[0]?.track?.name}</h5>
                  <h4>{`${estado.musicaAtual[0]?.track?.album?.artists?.map((v) => v.name).join(" e ")}`}</h4>
               </>
            )}

            {estado.mode === "albumMode" && (
               <>
                  <h5>{estado.musicaAtual[0]?.name}</h5>
                  <h4>{`${estado.albumAtual[0]?.artists?.map((v) => v.name).join(" e ")}`}</h4>
               </>
            )}

            <div id={styles.detalhes}>
               <p>{converterSecs(tempoAtual)}</p>
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
               <p>{duracao > 0 ? converterSecs(duracao) : converterSecs(0)}</p>
            </div>
            <AudioControles />
         </div>
      </div>
   );
};

export default AudioPlayer;
