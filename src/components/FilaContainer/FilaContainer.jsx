import React, { useContext, useEffect } from "react";
import styles from "./FilaContainer.module.css";
import { musicContext } from "../../App";
import { useLocation } from "react-router-dom";

const FilaContainer = ({ fila }) => {
   const { estado, dispatch } = useContext(musicContext);

   const loc = useLocation();

   // Convertendo millisegundos para minutos
   function converter(millis) {
      let minutos = Math.floor(millis / 60000);
      let segundos = ((millis % 60000) / 1000).toFixed(0);
      return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
   }

   return (
      <div id={styles.cont}>
         <h4>A seguir </h4>
         <div>
            {fila?.map((v, key) => {
               return (
                  <div
                     onClick={() => {
                        dispatch({ type: "setMusicaAtual", payload: [v] });
                        dispatch({ type: "setTargetAtual", payload: key });
                        dispatch({ type: "setisPlaying", payload: false });
                     }}
                     key={key}
                  >
                     {estado.mode === "playlistMode" && !loc?.state?.mode && (
                        <>
                           <p>{v?.track?.name}</p>
                           <span>{converter(v?.track?.duration_ms)}</span>
                        </>
                     )}
                     {estado.mode === "albumMode" && (
                        <>
                           <p>{v?.name}</p>
                           <span>{converter(v?.duration_ms)}</span>
                        </>
                     )}
                     {estado.mode === "playlistMode" && loc?.state?.mode === "single" && (
                        <>
                           <p>{v?.name}</p>
                           <span>{converter(v?.duration_ms)}</span>
                        </>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default FilaContainer;
