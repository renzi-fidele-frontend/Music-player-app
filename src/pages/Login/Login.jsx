import React from "react";
import styles from "./Login.module.css";
import { RiSpotifyFill } from "react-icons/ri";
import { loginEndPoint } from "../../../spotify";

const Login = () => {
   return (
      <div id={styles.container}>
         <i>
            <RiSpotifyFill />
         </i>
         <a href={loginEndPoint}>Entrar</a>
         <p>Entre com a sua conta do Spotify</p>
      </div>
   );
};

export default Login;
