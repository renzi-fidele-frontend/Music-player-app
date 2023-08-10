import React, { useEffect, useRef, useState } from "react";
import styles from "./AudioProgress.module.css";
import disco from "../../assets/vinyl.png";
import ProgressBar from "progressbar.js";

const AudioProgress = ({ isPlaying, foto, percentagem, size, cor }) => {
   // Ref do progressBar no JSX
   const progressRef = useRef(null);
   const [estado, setEstado] = useState(null);

   

   useEffect(() => {
      if (progressRef.current.children.length === 1) {
         const progress_bar = new ProgressBar.Circle(progressRef.current, {
            color: "var(--cor-tema)",
            strokeWidth: 3,
            duration: 1000,
            easing: "linear",
            trailColor: "#304d80",
         });
         setEstado(progress_bar);

         progress_bar.animate(percentagem / 100);
      }
   }, []);

   useEffect(() => {
      console.log(`Aumentor para ${percentagem}`);
      estado ? estado.animate(percentagem / 100) : undefined;
   }, [percentagem]);

   return (
      <div ref={progressRef} id={styles.ct}>
         <div>
            <div><img src={disco} alt="" />
            <img src={foto} alt="" /></div>
            
         </div>
      </div>
   );
};

export default AudioProgress;
