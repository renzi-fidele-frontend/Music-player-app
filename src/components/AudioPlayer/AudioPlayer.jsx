import React, { useContext, useEffect, useState } from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";
import { musicContext } from "../../App";

const AudioPlayer = () => {
   const { estado, dispatch } = useContext(musicContext);

   useEffect(() => {
      console.log(estado.musicaAtual[0]?.track.name);
      console.log(estado.musicaAtual[0]?.track.artists);
      console.log(estado.musicaAtual[0]?.track.name);
   }, [estado]);

   const [perc, setPerc] = useState(25);

   return (
      <div id={styles.cont}>
         <div id={styles.left}>
            <AudioProgress
               foto={estado?.musicaAtual[0]?.track?.album?.images[0]?.url}
               size={300}
               isPlaying={true}
               cor={"var(--cor-tema)"}
               percentagem={perc}
            />
         </div>
         <div id={styles.right}>
            <h5></h5>
            <h4></h4>
         </div>
      </div>
   );
};

export default AudioPlayer;
