import { useEffect, useState } from "react";

const token = localStorage.getItem("token");

const useAuth = () => {
   const [logado, setLogado] = useState(false);

   useEffect(() => {
      // Caso esteja logado
      if (token) {
         setLogado(true);
      } else {
         let hash = window.location.hash;
         if (hash.length > 10) {
            localStorage.setItem("token", hash.split("&")[0].split("=")[1]);
            window.location.pathname = "/leitor";
            window.location.hash = "";
         } else {
            setLogado(false);
         }
      }
   }, []);

   return { logado, setLogado };
};

export default useAuth;
