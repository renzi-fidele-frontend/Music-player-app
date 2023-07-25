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
      console.log(tokenLocal)
      if (tokenLocal !== null ) {
         console.log("O token existe")
         setToken(tokenLocal);
         setlogado(true);
      } else {
         let hash = window.location.hash;
         
         if (hash.length > 10) {
            localStorage.setItem("token", hash.split("&")[0].split("=")[1]);
            setlogado(true);
            window.location.pathname = "/leitor";
            window.location.hash = "";
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
                     <Route exact path="/" element={logado === true ? <Leitor /> : <Login />} />
                     <Route path="/destaque" element={logado === true ? <Destaque /> : <Login />} />
                     <Route path="/favoritos" element={logado === true ? <Favoritos /> : <Login />} />
                     <Route path="/biblioteca" element={logado === true ? <Biblioteca /> : <Login />} />
                     <Route path="/feed" element={logado === true ? <Feed /> : <Login />} />
                     <Route path="/leitor" element={logado === true ? <Leitor /> : <Login />} />
                     <Route path="/entrar" element={logado === true ? <Navigate to={"/leitor"} /> : <Login />} />
                  </Routes>
               </div>
            </tokenContext.Provider>
         </div>
      </Router>
   );
}

export default App;
