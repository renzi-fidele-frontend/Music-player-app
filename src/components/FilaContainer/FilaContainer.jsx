import React, { useContext, useEffect } from "react";
import styles from "./FilaContainer.module.css";
import { musicContext } from "../../App";
import { reduzir } from "../AlbumCard/AlbumCard";

const FilaContainer = ({ fila }) => {
   const { estado, dispatch } = useContext(musicContext);


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
                     {estado.mode === "playlistMode" && estado.singleMode === false && (
                        <>
                           <p title={v?.track?.name}>{reduzir(v?.track?.name, 35)}</p>
                           <span>{converter(v?.track?.duration_ms)}</span>
                        </>
                     )}
                     {estado.mode === "albumMode" && (
                        <>
                           <p title={v?.name}>{reduzir(v?.name, 35)}</p>
                           <span>{converter(v?.duration_ms)}</span>
                        </>
                     )}
                     {estado.mode === "playlistMode" && estado.singleMode === true && (
                        <>
                           <p title={v?.name}>{reduzir(v?.name, 35)}</p>
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
