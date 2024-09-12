import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Leitor from "./pages/Leitor/Leitor";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Destaque from "./pages/Destaque/Destaque";
import Favoritos from "./pages/Favoritos/Favoritos";
import Feed from "./pages/Feed/Feed";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import { useEffect, useReducer, useState } from "react";
import Modal from "./components/Modal/Modal";
import { MusicInitialState, MusicProvider, MusicReducer } from "./context/MusicContext";

function App() {
   const token = localStorage.getItem("token");
   const [state, setState] = useState(token);

   const [estado, dispatch] = useReducer(MusicReducer, MusicInitialState);

   useEffect(() => {
      console.log("Token mudou");
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
   }, [state]);

   return (
      <Router>
         <div className="App">
            <MusicProvider value={{ estado, dispatch }}>
               <div id="left">
                  <SideBar />
                  <Modal />
               </div>
               <div id="right">
                  <Routes>
                     <Route exact path="/" element={token ? <Leitor /> : <Login />} />
                     <Route path="/destaque" element={token ? <Destaque /> : <Login />} />
                     <Route path="/favoritos" element={token ? <Favoritos /> : <Login />} />
                     <Route path="/biblioteca" element={token ? <Biblioteca /> : <Login />} />
                     <Route path="/feed" element={token ? <Feed /> : <Login />}>
                        <Route path="/feed/categoria" />
                        <Route path="/feed/pesquisa" />
                     </Route>
                     <Route path="/leitor" element={token ? <Leitor /> : <Login />} />
                     <Route path="/entrar" element={token ? <Navigate to={"/leitor"} /> : <Login />} />
                  </Routes>
               </div>
            </MusicProvider>
         </div>
      </Router>
   );
}

export default App;
