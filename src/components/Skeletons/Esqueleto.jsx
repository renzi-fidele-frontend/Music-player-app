import React from "react";
import "./Esqueleto.css";

const Esqueleto = ({ tipo }) => {
   return <div className={`sk ${tipo}`}></div>;
};

export default Esqueleto;
