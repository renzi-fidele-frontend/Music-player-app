import React from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";

const AudioPlayer = () => {
   return (
      <div id={styles.ct}>
         <AudioProgress size={300} isPlaying={true} cor={"var(--cor-tema)"} percentagem={75}/>
      </div>
   );
};

export default AudioPlayer;
