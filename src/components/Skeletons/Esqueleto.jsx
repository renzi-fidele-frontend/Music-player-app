import React from "react";
import "./Esqueleto.css";

const Esqueleto = ({ tipo }) => {
   return <div className={`sk ${tipo} ${tipo === "albumCard" && "swiper"}`}></div>;
};

export default Esqueleto;
