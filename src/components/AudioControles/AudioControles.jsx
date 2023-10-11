import React, { useContext } from "react";
import styles from "./AudioControles.module.css";

// React icons
import { BsShuffle, BsFillPauseFill, BsFillSkipEndFill, BsFillSkipStartFill, BsRepeat, BsFillPlayFill } from "react-icons/bs";
import { musicContext } from "../../App";

const AudioControles = () => {
   const { estado, dispatch } = useContext(musicContext);

   function playPause() {
      dispatch({ type: "setisPlaying", payload: !estado.isPlaying });
   }

   return (
      <div id={styles.cont}>
         <BsShuffle />
         <BsFillSkipStartFill />
         {estado.isPlaying === true ? (
            <BsFillPauseFill onClick={playPause} className={styles.meio} />
         ) : (
            <BsFillPlayFill onClick={playPause} className={styles.meio} />
         )}

         <BsFillSkipEndFill />
         <BsRepeat />
      </div>
   );
};

export default AudioControles;