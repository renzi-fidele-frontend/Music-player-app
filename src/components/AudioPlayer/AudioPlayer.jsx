import React, { useState } from "react";
import styles from "./AudioPlayer.module.css";
import AudioProgress from "../AudioProgress/AudioProgress";

const AudioPlayer = () => {
   const [perc, setPerc] = useState(25);

   return (
      <div id={styles.ct}>
         <AudioProgress size={300} isPlaying={true} cor={"var(--cor-tema)"} percentagem={perc} />
      </div>
   );
};

export default AudioPlayer;
