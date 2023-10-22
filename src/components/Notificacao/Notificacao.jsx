import React, { useContext, useEffect, useRef } from "react";
import { musicContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notificacao = () => {
   const { estado, dispatch } = useContext(musicContext);

   const erroId = "erro-id";
   const sucessId = "sucesso-id";

   // Controlador da notificação
   useEffect(() => {
      if (estado.musicaAtual[0]?.track?.preview_url === null && estado.musicaAtual.length > 0) {
         toast("Prévia indisponível", { type: "warning", toastId: erroId });
      } else if (estado.musicaAtual[0]?.track?.preview_url !== undefined) {
         toast("Prévia disponível", { type: "success", toastId: sucessId });
      }
   }, [estado.musicaAtual]);

   return <ToastContainer />;
};

export default Notificacao;
