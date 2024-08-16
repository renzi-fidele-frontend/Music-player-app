import styles from "./Login.module.css";
import { RiSpotifyFill } from "react-icons/ri";
import { loginEndPoint } from "../../../spotify";

const Login = () => {
   return (
      <div id={styles.ct}>
         <i>
            <RiSpotifyFill />
         </i>
         <a href={loginEndPoint}>Entrar</a>
         <div id={styles.info}>
            <h3>Memorize estes dados para fazer login</h3>
            <div>
               <h6>Email:</h6>
               <p>testadorfy@outlook.com</p>
            </div>
            <div>
               <h6>Senha:</h6>
               <p>Spotify123</p>
            </div>
         </div>
      </div>
   );
};

export default Login;
