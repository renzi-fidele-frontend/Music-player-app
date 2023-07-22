import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leitor from "./pages/Leitor/Leitor";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Destaque from "./pages/Destaque/Destaque";
import Favoritos from "./pages/Favoritos/Favoritos";
import Feed from "./pages/Feed/Feed";
import SideBar from "./components/SideBar/SideBar";

function App() {
   return (
      <Router>
         <div className="App">
            <div id="left">
               <SideBar />
            </div>
            <div id="right">
               <Routes>
                  <Route exact path="/" element={<Leitor />} />
                  <Route path="/destaque" element={<Destaque />} />
                  <Route path="/favoritos" element={<Favoritos />} />
                  <Route path="/biblioteca" element={<Biblioteca />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/leitor" element={<Leitor />} />
               </Routes>
            </div>
         </div>
      </Router>
   );
}

export default App;
