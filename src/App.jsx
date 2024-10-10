import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Leitor from "./pages/Leitor/Leitor";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Destaque from "./pages/Destaque/Destaque";
import Favoritos from "./pages/Favoritos/Favoritos";
import Feed from "./pages/Feed/Feed";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import { useReducer } from "react";
import Modal from "./components/Modal/Modal";
import { MusicInitialState, MusicProvider, MusicReducer } from "./context/MusicContext";
import useAuth from "./hooks/useAuth";

function App() {
   const [estado, dispatch] = useReducer(MusicReducer, MusicInitialState);
   const { logado } = useAuth();

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
                     <Route exact path="/" element={logado ? <Leitor /> : <Login />} />
                     <Route path="/destaque" element={logado ? <Destaque /> : <Login />} />
                     <Route path="/favoritos" element={logado ? <Favoritos /> : <Login />} />
                     <Route path="/biblioteca" element={logado ? <Biblioteca /> : <Login />} />
                     <Route path="/feed" element={logado ? <Feed /> : <Login />}>
                        <Route path="/feed/categoria" />
                        <Route path="/feed/pesquisa" />
                     </Route>
                     <Route path="/leitor" element={logado ? <Leitor /> : <Login />} />
                     <Route path="/entrar" element={logado ? <Navigate to={"/leitor"} /> : <Login />} />
                  </Routes>
               </div>
            </MusicProvider>
         </div>
      </Router>
   );
}

export default App;
