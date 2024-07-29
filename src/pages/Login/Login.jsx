import React from "react";
import styles from "./Login.module.css";
import { RiSpotifyFill } from "react-icons/ri";
import { loginEndPoint } from "../../../spotify";

const Login = () => {
   // TODO: Adicionar informações de login pois somente uma conta é que funciona

   return (
      <div id={styles.ct}>
         <i>
            <RiSpotifyFill />
         </i>
         <a href={loginEndPoint}>Entrar</a>
         <p>Entre com a sua conta do Spotify</p>
      </div>
   );
};

export default Login;
