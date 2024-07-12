import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";
import { musicContext } from "../../App";
import AudioControles from "../AudioControles/AudioControles";
import Notificacao from "../Notificacao/Notificacao";
import { reduzir } from "../../hooks/useReduzir";

const AudioPlayer = () => {
   const { estado, dispatch } = useContext(musicContext);
   const sliderRef = useRef(null);

   // Link da música atual sendo tocada
   const linkAudio = () => {
      if (estado.mode === "playlistMode" && estado.singleMode === false) {
         return estado.aSeguir[estado.targetAtual]?.track?.preview_url;
      } else if (estado.mode === "albumMode") {
         return estado.aSeguir[estado.targetAtual]?.preview_url;
      } else if (estado.mode === "playlistMode" && estado.singleMode === true) {
         return estado.aSeguir[estado.targetAtual]?.preview_url;
      }
   };

   // Link da primeira música da playslist selecionada
   const prevLink = () => {
      if (estado.mode === "playlistMode" && estado.singleMode === false) {
         return estado.aSeguir[0]?.track?.preview_url;
      } else if (estado.mode === "albumMode") {
         return estado.aSeguir[0]?.preview_url;
      } else if (estado.mode === "playlistMode" && estado.singleMode === true) {
         return estado.aSeguir[0]?.preview_url;
      }
   };

   // Valor do src do áudio inicializado
   const existe = estado.audioRef?.attributes?.src?.value;

   // Duração da música atual
   const duracao = estado.audioRef?.duration;

   // Caso nenhuma música esteja tocando e nehuma url valida sido entregue ao Audio
   useEffect(() => {
      if (estado.aSeguir.length > 0) {
         if (estado.isPlaying === false && estado.targetAtual === 0 && (existe === undefined || existe === "undefined")) {
            // Selecionando a primeria musica da playlist
            estado.audioRef.src = prevLink();
         }
      }
   }, [estado.aSeguir]);

   // Caso uma nova musica seja selecionada
   useEffect(() => {
      if (estado.audioRef.src !== linkAudio()) {
         estado.audioRef.src = linkAudio();
      }
   }, [estado.musicaAtual]);

   // Convertendo segundos para minutos
   function converterSecs(secs) {
      let minutos = Math.floor(secs / 600);
      let segundos = (secs % 600).toFixed(0);
      return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
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
         let randomIndex = Math.floor(Math.random() * estado.aSeguir.length);
         if (estado.targetAtual === randomIndex) {
            let otherRandomIndex = Math.floor(Math.random() * estado.aSeguir.length);
            dispatch({ type: "setTargetAtual", payload: otherRandomIndex });
            dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[otherRandomIndex]] });
         } else {
            dispatch({ type: "setTargetAtual", payload: randomIndex });
            dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[randomIndex]] });
         }
         console.log(randomIndex);
      }

      dispatch({ type: "setisPlaying", payload: false });
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

   // Percentagem atual da música sendo tocada
   const percentagem = duracao ? (tempoAtual / duracao) * 100 : 0;

   // Controlador de play e pouse
   useEffect(() => {
      if (estado.isPlaying === true) {
         startTimer();
      } else {
         clearInterval(intervaloRef.current);
         estado.audioRef.pause();
      }
   }, [estado.isPlaying]);

   const foto = () => {
      if (estado.mode === "playlistMode" && estado.singleMode === false) {
         return estado?.musicaAtual[0]?.track?.album?.images[0]?.url;
      } else if (estado.mode === "playlistMode" && estado.singleMode === true) {
         return estado?.musicaAtual[0]?.album?.images[0]?.url;
      } else if (estado.mode === "albumMode") {
         return estado.albumAtual[0]?.images[0].url;
      }
   };

   return (
      <div id={styles.cont}>
         <div id={styles.left}>
            <AudioProgress foto={foto()} size={300} isPlaying={estado?.isPlaying} cor={"var(--cor-tema)"} percentagem={percentagem} />
            <Notificacao />
         </div>
         <div id={styles.right}>
            {estado.mode === "playlistMode" && estado.singleMode === false && (
               <>
                  <h5>{reduzir(estado.musicaAtual[0]?.track?.name, 45)}</h5>
                  <h4>{`${estado.musicaAtual[0]?.track?.album?.artists?.map((v) => v.name).join(" e ")}`}</h4>
               </>
            )}

            {estado.mode === "albumMode" && (
               <>
                  <h5>{reduzir(estado.musicaAtual[0]?.name, 45)}</h5>
                  <h4>{`${estado.albumAtual[0]?.artists?.map((v) => v.name).join(" e ")}`}</h4>
               </>
            )}

            {estado.mode === "playlistMode" && estado.singleMode === true && (
               <>
                  <h5>{reduzir(estado.musicaAtual[0]?.name, 45)}</h5>
                  <h4>{reduzir(`${estado.musicaAtual[0]?.artists?.map((v) => v.name).join(" e ")}`, 45)}</h4>
               </>
            )}

            <div id={styles.detalhes}>
               <p>{converterSecs(tempoAtual)}</p>

               <div>
                  <input
                     max={30}
                     min={0}
                     value={tempoAtual}
                     onChange={(e) => {
                        setTempoAtual(e.target.value);
                        estado.audioRef.currentTime = e.target.value;
                     }}
                     ref={sliderRef}
                     type="range"
                     id={styles.slider}
                  />
               </div>

               <p>{duracao > 0 ? converterSecs(duracao) : converterSecs(0)}</p>
            </div>
            <AudioControles />
         </div>
      </div>
   );
};

export default AudioPlayer;
