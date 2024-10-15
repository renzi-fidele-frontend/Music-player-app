import { useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";
import AudioControles from "../AudioControles/AudioControles";
import Notificacao from "../Notificacao/Notificacao";

import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";
import useControles from "../../hooks/useControles";
import { secToMin } from "../../utils/secToMin";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import useSpotifyApi from "../../hooks/useSpotifyApi";
import { reduzir } from "../../utils/reduzirTexto";

// TODO: Adicionar feat de seguir artistas
// TODO: Adicionar feat de cta para seguir o artista da musica tocando
// TODO: Adicionar feat de refresh do token de autenticação

const AudioPlayer = () => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();
   const sliderRef = useRef(null);
   const { saltar } = useControles();
   const [following, setFollowing] = useState([]);

   const { apanharDadosComParam: seguirArtista } = useSpotifyApi(null, "PUT", () => {
      setFollowing([true]);
   });
   const { apanharDados: checkIsFollowingArtist } = useSpotifyApi(
      `me/following/contains?type=artist&ids=${estado.albumAtual[0]?.artists?.map((v) => v?.id).join(",")}`,
      "GET",
      (v) => {
         setFollowing(v);
      }
   );

   useEffect(() => {
      if (estado?.mode === "albumMode") checkIsFollowingArtist();
   }, []);

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
      if (!estado.isPlaying) {
         // Pausando a música
         dispatch({ type: "setisPlaying", payload: false });
      }
   }, [estado.musicaAtual]);

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

   // Controlador de play e pause
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
                  <h4>{`${estado.musicaAtual[0]?.track?.album?.artists?.map((v) => v.name).join(` ${t("pages.leitor.prefix")} `)}`}</h4>
               </>
            )}

            {estado.mode === "albumMode" && (
               // TODO: Adicionar feat de verificar se o usuário segue o artista
               <>
                  <h5>{reduzir(estado.musicaAtual[0]?.name, 45)}</h5>
                  <h4>
                     {estado.albumAtual[0]?.artists?.map((v, k) => (
                        <>
                           <span className={styles.artistText} key={k}>
                              {v?.name}
                              {!following[k] ? (
                                 <IoMdHeartEmpty onClick={() => seguirArtista(`me/following?ids=${v?.id}&type=artist`)} />
                              ) : (
                                 <IoMdHeart />
                              )}
                           </span>
                           {k + 1 !== estado.albumAtual[0]?.artists?.length && ` | `}
                        </>
                     ))}
                  </h4>
               </>
            )}

            {estado.mode === "playlistMode" && estado.singleMode === true && (
               <>
                  <h5>{reduzir(estado.musicaAtual[0]?.name, 45)}</h5>
                  <h4>{reduzir(`${estado.musicaAtual[0]?.artists?.map((v) => v.name).join(` ${t("pages.leitor.prefix")} `)}`, 45)}</h4>
               </>
            )}

            <div id={styles.detalhes}>
               <p>{secToMin(tempoAtual)}</p>

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

               <p>{duracao > 0 ? secToMin(duracao) : secToMin(0)}</p>
            </div>
            <AudioControles />
         </div>
      </div>
   );
};

export default AudioPlayer;
