import React, { useEffect, useState } from "react";

const useLargura = () => {
   const [largura, setLargura] = useState(window.innerWidth);

   useEffect(() => {
      function handleResize() {
         setLargura(window.innerWidth);
         window.addEventListener("resize", handleResize);
      }

      //   Limpeza do evento
      return () => window.removeEventListener("resize", handleResize);
   }, [largura]);

   return largura;
};

export default useLargura;
