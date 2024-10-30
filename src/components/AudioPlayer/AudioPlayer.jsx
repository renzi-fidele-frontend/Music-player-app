import { useEffect, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";
import AudioControles from "../AudioControles/AudioControles";
import Notificacao from "../Notificacao/Notificacao";
import { MusicValue } from "../../context/MusicContext";
import useControles from "../../hooks/useControles";
import { secToMin } from "../../utils/secToMin";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import useSpotifyApi from "../../hooks/useSpotifyApi";
import { reduzir } from "../../utils/reduzirTexto";
import Tooltip from "../Tooltip/Tooltip";
import { useTranslation } from "react-i18next";

// TODO: Adicionar feat de refresh do token de autenticação

const AudioPlayer = () => {
   const { t } = useTranslation();
   const { estado, dispatch } = MusicValue();
   const sliderRef = useRef(null);
   const { saltar } = useControles();
   const [following, setFollowing] = useState([]);

   const { apanharDadosComParam: seguirArtista } = useSpotifyApi(null, "PUT", () => {
      if (estado?.mode === "playlistMode" && !estado?.singleMode) {
         checkIsFollowingArtist();
      }

      if (estado?.mode === "albumMode") setFollowing([true]);
      if (estado?.mode === "playlistMode" && estado?.singleMode) checkIsFollowingArtist();
   });

   const idsArtistas = () => {
      let ids = "";
      if (estado?.mode === "playlistMode" && !estado?.singleMode) {
         ids = estado?.musicaAtual[0]?.track?.artists;
      }
      if (estado?.mode === "albumMode") {
         ids = estado?.albumAtual[0]?.artists;
      }
      if (estado?.mode === "playlistMode" && estado?.singleMode) {
         ids = estado?.musicaAtual[0]?.artists;
      }
      return ids?.map((v) => v?.id).join(",");
   };
   const { apanharDados: checkIsFollowingArtist } = useSpotifyApi(`me/following/contains?type=artist&ids=${idsArtistas()}`, "GET", (v) => {
      setFollowing(v);
   });

   const { apanharDadosComParam: pararDeSeguirArtista } = useSpotifyApi(null, "DELETE", () => {
      checkIsFollowingArtist();
   });

   useEffect(() => {
      checkIsFollowingArtist();
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

   // Link da primeira música da playlist selecionada
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

   const intervaloRef = useRef();

   // Tempo de playback da música atual
   const [tempoAtual, setTempoAtual] = useState(estado.audioRef?.currentTime);

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
            {estado.mode === "playlistMode" && !estado.singleMode && (
               <>
                  <h5>{reduzir(estado.musicaAtual[0]?.track?.name, 45)}</h5>
                  <h4>
                     {estado.musicaAtual[0]?.track?.album?.artists?.map((v, k) => (
                        <>
                           <span className={styles.artistText} key={k}>
                              {v?.name}
                              {!following[k] ? (
                                 <Tooltip conteudo={t("pages.leitor.follow")}>
                                    <i>
                                       <IoMdHeartEmpty onClick={() => seguirArtista(`me/following?ids=${v?.id}&type=artist`)} />
                                    </i>
                                 </Tooltip>
                              ) : (
                                 <Tooltip conteudo={t("pages.leitor.unfollow")}>
                                    <i>
                                       <IoMdHeart
                                          onClick={() => {
                                             pararDeSeguirArtista(`me/following?type=artist&ids=${v?.id}`);
                                          }}
                                       />
                                    </i>
                                 </Tooltip>
                              )}
                           </span>
                        </>
                     ))}
                  </h4>
               </>
            )}

            {estado.mode === "albumMode" && (
               <>
                  <h5>{reduzir(estado.musicaAtual[0]?.name, 45)}</h5>
                  <h4>
                     {estado.albumAtual[0]?.artists?.map((v, k) => (
                        <>
                           <span className={styles.artistText} key={k}>
                              {v?.name}
                              {!following[k] ? (
                                 <Tooltip conteudo={t("pages.leitor.follow")}>
                                    <i>
                                       <IoMdHeartEmpty onClick={() => seguirArtista(`me/following?ids=${v?.id}&type=artist`)} />
                                    </i>
                                 </Tooltip>
                              ) : (
                                 <Tooltip conteudo={t("pages.leitor.unfollow")}>
                                    <i>
                                       <IoMdHeart
                                          onClick={() => {
                                             pararDeSeguirArtista(`me/following?type=artist&ids=${v?.id}`);
                                          }}
                                       />
                                    </i>
                                 </Tooltip>
                              )}
                           </span>
                        </>
                     ))}
                  </h4>
               </>
            )}

            {estado.mode === "playlistMode" && estado.singleMode && (
               <>
                  <h5>{reduzir(estado.musicaAtual[0]?.name, 45)}</h5>
                  <h4>
                     {estado.musicaAtual[0]?.artists?.map((v, k) => (
                        <>
                           <span className={styles.artistText} key={k}>
                              {v?.name}
                              {!following[k] ? (
                                 <Tooltip conteudo={t("pages.leitor.follow")}>
                                    <i>
                                       <IoMdHeartEmpty
                                          onClick={() => {
                                             seguirArtista(`me/following?ids=${v?.id}&type=artist`);
                                          }}
                                       />
                                    </i>
                                 </Tooltip>
                              ) : (
                                 <Tooltip conteudo={t("pages.leitor.unfollow")}>
                                    <i>
                                       <IoMdHeart
                                          onClick={() => {
                                             pararDeSeguirArtista(`me/following?type=artist&ids=${v?.id}`);
                                          }}
                                       />
                                    </i>
                                 </Tooltip>
                              )}
                           </span>
                        </>
                     ))}
                  </h4>
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
