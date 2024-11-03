import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MusicValue } from "../../context/MusicContext";

const Notificacao = () => {
   const { estado } = MusicValue();

   const erroId = "erro-id";
   const sucessId = "sucesso-id";

   // Controlador da notificação
   useEffect(() => {
      if (!estado?.isPlaying) {
         if (estado.mode === "playlistMode" && !estado.singleMode) {
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
         } else if (estado.mode === "playlistMode" && estado.singleMode) {
            if (estado.musicaAtual[0]?.preview_url === null && estado.musicaAtual.length > 0) {
               toast("Prévia indisponível", { type: "warning", toastId: erroId });
            } else if (estado.musicaAtual[0]?.preview_url?.length > 0) {
               toast("Prévia disponível", { type: "success", toastId: sucessId });
            }
         }
      }
   }, [estado.musicaAtual]);

   return <ToastContainer />;
};

export default Notificacao;
