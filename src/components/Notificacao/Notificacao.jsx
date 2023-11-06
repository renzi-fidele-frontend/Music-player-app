import React, { useContext, useEffect } from "react";
import { musicContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const Notificacao = () => {
   const { estado, dispatch } = useContext(musicContext);

   const erroId = "erro-id";
   const sucessId = "sucesso-id";

   const loc = useLocation();

   // Controlador da notificação
   useEffect(() => {
      if (estado.mode === "playlistMode" && !loc?.state?.mode) {
         if (estado.musicaAtual[0]?.track?.preview_url === null && estado.musicaAtual.length > 0) {
            toast("Prévia indisponível", { type: "warning", toastId: erroId });
         } else if (estado.musicaAtual[0]?.track?.preview_url !== undefined) {
            toast("Prévia disponível", { type: "success", toastId: sucessId });
         }
      } else if (estado.mode === "albumMode") {
         if (estado.musicaAtual[0]?.preview_url === null && estado.musicaAtual.length > 0) {
            toast("Prévia indisponível", { type: "warning", toastId: erroId });
         } else if (estado.musicaAtual[0]?.preview_url?.length > 0) {
            toast("Prévia disponível", { type: "success", toastId: sucessId });
         }
      } else if (estado.mode === "playlistMode" && loc?.state?.mode === "single") {
         if (estado.musicaAtual[0]?.preview_url === null && estado.musicaAtual.length > 0) {
            toast("Prévia indisponível", { type: "warning", toastId: erroId });
         } else if (estado.musicaAtual[0]?.preview_url?.length > 0) {
            toast("Prévia disponível", { type: "success", toastId: sucessId });
         }
      }
   }, [estado.musicaAtual]);

   return <ToastContainer />;
};

export default Notificacao;
