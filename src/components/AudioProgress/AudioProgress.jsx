import React from "react";
import styles from "./AudioProgress.module.css";
import { color } from "framer-motion";
import disco from "../../assets/vinyl.png";

const Circle = ({ cor, percentagem, size, strokeWidth }) => {
   const radius = size / 2 - 10;
   const circ = 2 * Math.PI * radius - 20;
   const strokePct = (100 - Math.round(percentagem) * circ) / 100;

   return (
      <circle
         r={radius}
         cx="50%"
         cy="50%"
         fill="transparent"
         stroke={strokePct !== circ ? cor : ""}
         strokeWidth={strokeWidth}
         strokeDasharray={circ}
         strokeDashoffset={percentagem ? strokePct : 0}
         strokeLinecap="round"
      ></circle>
   );
};

const AudioProgress = ({ isPlaying, percentagem, size, cor }) => {
   return (
      <div id={styles.ct}>
         <svg width={size} height={size}>
            <g>
               <Circle strokeWidth={"0.4rem"} cor="#3b4f73" size={size} />
               <Circle strokeWidth={"0.6rem"} cor={cor} size={size} percentagem={percentagem} />
            </g>
            <defs>
               <clipPath id="circulo">
                  <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#FFFFFF"></circle>
               </clipPath>
               <clipPath id="circuloDentro">
                  <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#FFFFFF"></circle>
               </clipPath>
            </defs>
            <img href={disco} x={100} y={100} clipPath={"#circulo"} className={isPlaying ? styles.ativo : undefined} alt="" />
         </svg>
      </div>
   );
};

export default AudioProgress;
