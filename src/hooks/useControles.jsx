import { MusicValue } from "../context/MusicContext";

const useControles = () => {
   const { estado, dispatch } = MusicValue();

   function playPause() {
      if (estado.audioRef.src.length > 0) {
         if (estado.isPlaying === false) {
            estado.audioRef?.play().then(() => {
               dispatch({ type: "setisPlaying", payload: true });
            });
         } else {
            estado.audioRef?.pause();
            dispatch({ type: "setisPlaying", payload: false });
         }
      }
   }

   function saltar() {
      if (!estado.aleatorio) {
         if (estado.targetAtual + 1 < estado.aSeguir.length) {
            dispatch({ type: "setTargetAtual", payload: estado.targetAtual + 1 });
            dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[estado.targetAtual + 1]] });
         } else {
            dispatch({ type: "setTargetAtual", payload: 0 });
            dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[0]] });
         }
      } else {
         // Gerando posição aleatória nas músicas selecionadas
         let randomIndex = Math.floor(Math.random() * estado.aSeguir.length);
         if (estado.targetAtual === randomIndex) {
            let otherRandomIndex = Math.floor(Math.random() * estado.aSeguir.length);
            dispatch({ type: "setTargetAtual", payload: otherRandomIndex });
            dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[otherRandomIndex]] });
         } else {
            dispatch({ type: "setTargetAtual", payload: randomIndex });
            dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[randomIndex]] });
         }
      }

      dispatch({ type: "setisPlaying", payload: false });
   }

   function voltar() {
      if (estado.targetAtual - 1 > 0) {
         dispatch({ type: "setTargetAtual", payload: estado.targetAtual - 1 });
         dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[estado.targetAtual - 1]] });
      } else {
         dispatch({ type: "setTargetAtual", payload: 0 });
         dispatch({ type: "setMusicaAtual", payload: [estado.aSeguir[0]] });
      }
   }

   function switchRepetir() {
      estado.audioRef.loop = !estado.audioRef.loop;
   }

   function switchAleatorio() {
      dispatch({ type: "setAleatorio", payload: !estado.aleatorio });
   }

   return { playPause, saltar, voltar, switchAleatorio, switchRepetir, estado };
};
export default useControles;
