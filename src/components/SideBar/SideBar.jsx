import { useEffect, useRef, useState } from "react";
import styles from "./SideBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

// React Icons
import { FaGlobe, FaGripfire } from "react-icons/fa";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { RiLayout2Fill } from "react-icons/ri";
import { IoLibrarySharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

// Imagens
import avatar1 from "../../assets/avatar1.gif";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";
import useSpotifyApi from "../../hooks/useSpotifyApi";

// token
const token = localStorage.getItem("token");

const SideBar = () => {
   const { t, i18n } = useTranslation();
   // Estilo de botao ativo
   const ativo = { color: "white", backgroundColor: "rgba(200, 116, 75, 0.5)", scale: "1.1" };
   const { estado, dispatch } = MusicValue();

   const [nome, setNome] = useState("");
   const [avatar, setAvatar] = useState(avatar1);

   const { apanharDados: apanharPerfil } = useSpotifyApi("me", "GET", (v) => {
      setNome(v.display_name.split(" ")[0]);
      setAvatar(v.images[0].url);
   });

   const sidebarRef = useRef(null);

   useEffect(() => {
      if (token !== null) {
         apanharPerfil();
      }
   }, []);

   const navegar = useNavigate();

   i18n.on("languageChanged", (idiomaNovo) => {
      dispatch({ type: "setIdioma", payload: idiomaNovo });
   });
   function mudarIdioma(idiomaNovo) {
      i18n.changeLanguage(idiomaNovo);
   }

   return (
      <>
         <div ref={sidebarRef} id={styles.ct}>
            <div className={styles.imgCont}>
               <img src={avatar} alt="user" />
               <p>{nome}</p>
            </div>

            <nav>
               <NavLink className={styles.btnCt} style={({ isActive }) => (isActive ? ativo : undefined)} to={"/feed"}>
                  <i>
                     <RiLayout2Fill />
                  </i>
                  <p>{t("nav.0")}</p>
               </NavLink>
               <NavLink className={styles.btnCt} style={({ isActive }) => (isActive ? ativo : undefined)} to={"/destaque"}>
                  <i>
                     <FaGripfire />
                  </i>
                  <p>{t("nav.1")}</p>
               </NavLink>
               <NavLink className={styles.btnCt} style={({ isActive }) => (isActive ? ativo : undefined)} to={"/leitor"}>
                  <i>
                     <TbPlayerPlayFilled />
                  </i>
                  <p>{t("nav.2")}</p>
               </NavLink>
               <NavLink className={styles.btnCt} style={({ isActive }) => (isActive ? ativo : undefined)} to={"/favoritos"}>
                  <i>
                     <AiFillHeart />
                  </i>
                  <p>{t("nav.3")}</p>
               </NavLink>
               <NavLink className={styles.btnCt} style={({ isActive }) => (isActive ? ativo : undefined)} to={"/biblioteca"}>
                  <i>
                     <IoLibrarySharp />
                  </i>
                  <p>{t("nav.4")}</p>
               </NavLink>
            </nav>

            <div id={styles.langCt} className={styles.btnCt}>
               <i>
                  <FaGlobe />
               </i>
               <p>
                  <span onClick={() => mudarIdioma("en")} className={estado.idioma === "en" && styles.langAtivo}>
                     EN
                  </span>{" "}
                  /{" "}
                  <span onClick={() => mudarIdioma("pt")} className={estado.idioma === "pt" && styles.langAtivo}>
                     PT
                  </span>
               </p>
            </div>
         </div>

         <header id={styles.ctMobile}>
            <div id={styles.left}>
               <img
                  onClick={() => {
                     navegar("/feed");
                  }}
                  src={logo}
                  alt="Logo do Musify App"
               />
            </div>
            <div id={styles.right}>
               <GiHamburgerMenu
                  onClick={() => {
                     sidebarRef.current.classList.toggle(styles.ativo);
                  }}
               />
            </div>
         </header>
      </>
   );
};

export default SideBar;
