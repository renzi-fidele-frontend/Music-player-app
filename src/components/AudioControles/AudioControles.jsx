import React, { useContext } from "react";
import styles from "./AudioControles.module.css";

// React icons
import { BsShuffle, BsFillPauseFill, BsFillSkipEndFill, BsFillSkipStartFill, BsRepeat, BsFillPlayFill } from "react-icons/bs";
import { musicContext } from "../../App";

const AudioControles = () => {
   const { estado, dispatch } = useContext(musicContext);

   return (
      <div id={styles.cont}>
         <BsShuffle />
         <BsFillSkipStartFill />
         {estado.isPlaying === true ? <BsFillPauseFill className={styles.meio} /> : <BsFillPlayFill className={styles.meio} />}

         <BsFillSkipEndFill />
         <BsRepeat />
      </div>
   );
};

export default AudioControles;
