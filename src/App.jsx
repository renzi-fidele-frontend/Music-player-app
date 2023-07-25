import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Leitor from "./pages/Leitor/Leitor";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Destaque from "./pages/Destaque/Destaque";
import Favoritos from "./pages/Favoritos/Favoritos";
import Feed from "./pages/Feed/Feed";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import { useEffect, useState } from "react";

// token
const token = localStorage.getItem("token");

function App() {
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
         </div>
      </Router>
   );
}

export default App;
