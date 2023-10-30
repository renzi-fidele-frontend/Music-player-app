import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Leitor from "./pages/Leitor/Leitor";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Destaque from "./pages/Destaque/Destaque";
import Favoritos from "./pages/Favoritos/Favoritos";
import Feed from "./pages/Feed/Feed";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import { createContext, useEffect, useReducer } from "react";

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
      case "setIdPlaylist":
         return { ...state, idPlaylist: action.payload };
      case "setPlaylists":
         return { ...state, playlists: action.payload };
      case "setisPlaying":
         return { ...state, isPlaying: action.payload };
      case "setRepetir":
         return { ...state, repetir: action.payload };
      case "setAudioRef":
         return { ...state, audioRef: action.payload };
      case "setSemelhantes":
         return { ...state, semelhantes: action.payload };
      case "setPlaylistsDestacadas":
         return { ...state, playlistsDestacadas: action.payload };
      case "setLancamentos":
         return { ...state, lancamentos: action.payload };
      case "setAlbumsSalvos":
         return { ...state, albumsSalvos: action.payload };
      case "setMusicasCurtidas":
         return { ...state, musicasCurtidas: action.payload };
      case "setAlbumAtual":
         return { ...state, albumAtual: action.payload };
      case "setMode":
         return { ...state, mode: action.payload };
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
      idPlaylist: "",
      playlists: [], // Playlists do usuário no spotify
      isPlaying: false, // Música tocando ou não
      progresso: 0, // Percentagem do progresso da música
      repetir: false, // Ativar loop de música ou não
      audioRef: new Audio(undefined), // estado do Audio que será inicializado
      semelhantes: [], // Artistas semelhantes
      playlistsDestacadas: [],
      lancamentos: [],
      mode: "",
      albumsSalvos: [],
      musicasCurtidas: [],
      albumAtual: [], // Objecto Album adicionado a playlist
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
