import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Leitor from "./pages/Leitor/Leitor";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Destaque from "./pages/Destaque/Destaque";
import Favoritos from "./pages/Favoritos/Favoritos";
import Feed from "./pages/Feed/Feed";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import { useEffect, useReducer } from "react";
import Modal from "./components/Modal/Modal";
import { MusicInitialState, MusicProvider, MusicReducer } from "./context/MusicContext";

function App() {
   const [estado, dispatch] = useReducer(MusicReducer, MusicInitialState);

   useEffect(() => {
      const token = localStorage.getItem("token");
      // Caso esteja logado
      if (token) {
         dispatch({ type: "setLogado", payload: true });
      } else {
         let hash = window.location.hash;
         if (hash.length > 10) {
            localStorage.setItem("token", hash.split("&")[0].split("=")[1]);
            dispatch({ type: "setLogado", payload: true });
            window.location.pathname = "/leitor";
            window.location.hash = "";
         } else {
            dispatch({ type: "setLogado", payload: false });
         }
      }
   }, []);

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
                     <Route exact path="/" element={estado?.logado ? <Leitor /> : <Login />} />
                     <Route path="/destaque" element={estado?.logado ? <Destaque /> : <Login />} />
                     <Route path="/favoritos" element={estado?.logado ? <Favoritos /> : <Login />} />
                     <Route path="/biblioteca" element={estado?.logado ? <Biblioteca /> : <Login />} />
                     <Route path="/feed" element={estado?.logado ? <Feed /> : <Login />}>
                        <Route path="/feed/categoria" />
                        <Route path="/feed/pesquisa" />
                     </Route>
                     <Route path="/leitor" element={estado?.logado ? <Leitor /> : <Login />} />
                     <Route path="/entrar" element={estado?.logado ? <Navigate to={"/leitor"} /> : <Login />} />
                  </Routes>
               </div>
            </MusicProvider>
         </div>
      </Router>
   );
}

export default App;
