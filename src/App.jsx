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
import Categoria from "./pages/Categoria/Categoria";

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
      case "setSingleMode":
         return { ...state, singleMode: action.payload };
      case "setTop50":
         return { ...state, top50: action.payload };
      case "setArtistasTop":
         return { ...state, artistasTop: action.payload };
      case "setCategorias":
         return { ...state, categorias: action.payload };
      case "setPlaylistsCategoria":
         return { ...state, playlistsCategoria: action.payload };

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
      repetir: false, // Ativar loop de música ou não
      audioRef: new Audio(undefined), // estado do Audio que será inicializado
      semelhantes: [], // Artistas semelhantes
      playlistsDestacadas: [], // Playlists em destaque
      lancamentos: [], // Lancamentos em destaque
      mode: "", //   Modos: playlistMode ou albumMode
      singleMode: false,
      albumsSalvos: [], // Albuns favoritos da conta do spotify
      musicasCurtidas: [], // Músicas favoritos da conta do spotify
      albumAtual: [], // Objecto Album adicionado a playlist
      top50: [], // Playlist contendo top 50 músicas mais escutadas
      artistasTop: [], // Artistas favoritos do usuário
      categorias: [], // Generos disponiveis no spotify
      playlistsCategoria: [], // Playlists da categoria selecionada
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
                     <Route path="/feed" element={token !== null ? <Feed /> : <Login />}>
                        <Route path="/feed/categoria" element={token !== null ? <Categoria /> : <Login />} />
                     </Route>
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
