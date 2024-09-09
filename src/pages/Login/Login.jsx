import styles from "./Login.module.css";
import { RiSpotifyFill } from "react-icons/ri";
import { loginEndPoint } from "../../../spotify";
import { useTranslation } from "react-i18next";

const Login = () => {
   const { t } = useTranslation();

   return (
      <div id={styles.ct}>
         <i>
            <RiSpotifyFill />
         </i>
         <a href={loginEndPoint}>{t("pages.login.btn")}</a>
         <div id={styles.info}>
            <h3>{t("pages.login.h3")}</h3>
            <div>
               <h6>Email:</h6>
               <p>testadorfy@outlook.com</p>
            </div>
            <div>
               <h6>{t("pages.login.h6")}</h6>
               <p>Spotify1234</p>
            </div>
         </div>
      </div>
   );
};

export default Login;
