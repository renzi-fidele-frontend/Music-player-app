import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Leitor from "./pages/Leitor/Leitor";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Destaque from "./pages/Destaque/Destaque";
import Favoritos from "./pages/Favoritos/Favoritos";
import Feed from "./pages/Feed/Feed";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import { createContext, useEffect, useReducer, useState } from "react";

const token = localStorage.getItem("token");

export const musicContext = createContext();

const reducer = (state, action) => {
   switch (action.type) {
      case "setMusicaAtual":
         return { ...state, musicaAtual: action.payload };
      case "setTargetAtual":
         return { ...state, targetAtual: action.payload };
      case "setaSeguir":
         return { ...state, aSeguir: action.payload };
      case "setIdAlbum":
         return { ...state, idAlbum: action.payload };
      case "setPlaylists":
         return { ...state, playlists: action.payload };
      case "setTempoAtual":
         return { ...state, tempoAtual: action.payload };
      case "setisPlaying":
         return { ...state, isPlaying: action.payload}
      default:
         return state;
   }
};

function App() {
   const [estado, dispatch] = useReducer(reducer, {
      musicaAtual: [], // objecto Musica selecionada para tocar
      targetAtual: 0, // Index da música atual
      aSeguir: [], // Musicas da playlist criada
      idAlbum: "",
      playlists: [], // Playlists do usuário no spotify
      isPlaying: false,
      progresso: 0, // Percentagem do progresso da música
      tempoAtual: 0,
   });

   useEffect(() => {
      // Caso esteja logado
      if (token !== null) {
         console.log("O token existe", token);
      } else {
         let hash = window.location.hash;

         if (hash.length > 10) {
            console.log("Logado com sucesso", hash);
            localStorage.setItem("token", hash.split("&")[0].split("=")[1]);
            window.location.pathname = "/leitor";
            window.location.hash = "";
            console.log(token);
         } else {
            console.log("Nao logado");
         }
      }
   }, [token]);

   return (
      <Router>
         <div className="App">
            <musicContext.Provider value={{ estado, dispatch }}>
               {" "}
               <div id="left">
                  <SideBar />
               </div>
               <div id="right">
                  <Routes>
                     <Route exact path="/" element={token !== null ? <Leitor /> : <Login />} />
                     <Route path="/destaque" element={token !== null ? <Destaque /> : <Login />} />
                     <Route path="/favoritos" element={token !== null ? <Favoritos /> : <Login />} />
                     <Route path="/biblioteca" element={token !== null ? <Biblioteca /> : <Login />} />
                     <Route path="/feed" element={token !== null ? <Feed /> : <Login />} />
                     <Route path="/leitor" element={token !== null ? <Leitor /> : <Login />} />
                     <Route path="/entrar" element={token !== null ? <Navigate to={"/leitor"} /> : <Login />} />
                  </Routes>
               </div>
            </musicContext.Provider>
         </div>
      </Router>
   );
}

export default App;
