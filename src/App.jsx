import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Leitor from "./pages/Leitor/Leitor";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Destaque from "./pages/Destaque/Destaque";
import Favoritos from "./pages/Favoritos/Favoritos";
import Feed from "./pages/Feed/Feed";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import { createContext, useEffect, useState } from "react";

export const tokenContext = createContext();

function App() {
   const [token, setToken] = useState("");
   const [logado, setlogado] = useState(false);

   useEffect(() => {
      // Caso esteja logado
      const tokenLocal = localStorage.getItem("token");
      if (tokenLocal != "undefined" || tokenLocal != "null") {
         setToken(tokenLocal);
      } else {
         let hash = window.location.hash;
         if (hash.length > 10) {
            localStorage.setItem("token", hash.split("&")[0].split("=")[1]);
            setlogado(true);
            window.location.pathname = "/leitor";
            window.location.hash = "";
         } else {
            return;
         }
      }
   }, []);

   return (
      <Router>
         <div className="App">
            <tokenContext.Provider value={{ token, setToken, logado }}>
               <div id="left">
                  <SideBar />
               </div>
               <div id="right">
                  <Routes>
                     <Route exact path="/" element={token.length > 10 ? <Leitor /> : <Login />} />
                     <Route path="/destaque" element={token.length > 10 ? <Destaque /> : <Login />} />
                     <Route path="/favoritos" element={token.length > 10 ? <Favoritos /> : <Login />} />
                     <Route path="/biblioteca" element={token.length > 10 ? <Biblioteca /> : <Login />} />
                     <Route path="/feed" element={token.length > 10 ? <Feed /> : <Login />} />
                     <Route path="/leitor" element={token.length > 10 ? <Leitor /> : <Login />} />
                     <Route path="/entrar" element={token.length > 10 ? <Navigate to={"/leitor"} /> : <Login />} />
                  </Routes>
               </div>
            </tokenContext.Provider>
         </div>
      </Router>
   );
}

export default App;
