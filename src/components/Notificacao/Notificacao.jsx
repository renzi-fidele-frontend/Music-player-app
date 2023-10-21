import React, { useContext, useEffect, useRef } from "react";
import { musicContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notificacao = () => {
   const { estado, dispatch } = useContext(musicContext);

   // Controlador da notificação
   useEffect(() => {
      console.log(estado.musicaAtual[0]?.track?.preview_url , estado.musicaAtual.length > 0);
      if (estado.musicaAtual[0]?.track?.preview_url === null && estado.musicaAtual.length > 0) {
         toast("A musica selecionada não possúi prévia");
      }
   }, [estado.musicaAtual]);

   return <ToastContainer />;
};

export default Notificacao;
