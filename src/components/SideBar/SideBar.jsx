import { useEffect, useRef, useState } from "react";
import styles from "./SideBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

// React Icons
import { FaGripfire, FaSignOutAlt } from "react-icons/fa";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { RiLayout2Fill } from "react-icons/ri";
import { IoLibrarySharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

// Imagens
import avatar1 from "../../assets/avatar1.gif";
import { useTranslation } from "react-i18next";

// token
const token = localStorage.getItem("token");

const SideBar = () => {
   const { t } = useTranslation();
   // Estilo de botao ativo
   const ativo = { color: "white", backgroundColor: "rgba(200, 116, 75, 0.5)", scale: "1.1" };

   const [nome, setNome] = useState("");
   const [avatar, setAvatar] = useState(avatar1);

   async function apanharPerfil() {
      const res = await fetch(`https://api.spotify.com/v1/me`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: "GET",
      })
         .then((res) => res.json())
         .then((res) => {
            console.log(res);
            if (res.error) {
               if (res.error.message === "The access token expired") {
                  console.log("secao expirou");
                  localStorage.clear();
               }
            }
            setNome(res.display_name.split(" ")[0]);
            setAvatar(res.images[0].url);
         })
         .catch((err) => {
            if (err.message === "The access token expired") {
               localStorage.clear();
            }
         });
   }

   const sidebarRef = useRef(null);

   useEffect(() => {
      if (token !== null) {
         apanharPerfil();
      }
   }, []);

   const navegar = useNavigate();

   return (
      <>
         <div ref={sidebarRef} id={styles.ct}>
            <div className={styles.imgCont}>
               <img src={avatar} alt="user" />
               <p>{nome}</p>
            </div>

            <nav>
               <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/feed"}>
                  <i>
                     <RiLayout2Fill />
                  </i>
                  <p>{t("nav.0")}</p>
               </NavLink>
               <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/destaque"}>
                  <i>
                     <FaGripfire />
                  </i>
                  <p>{t("nav.1")}</p>
               </NavLink>
               <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/leitor"}>
                  <i>
                     <TbPlayerPlayFilled />
                  </i>
                  <p>{t("nav.2")}</p>
               </NavLink>
               <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/favoritos"}>
                  <i>
                     <AiFillHeart />
                  </i>
                  <p>{t("nav.3")}</p>
               </NavLink>
               <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/biblioteca"}>
                  <i>
                     <IoLibrarySharp />
                  </i>
                  <p>{t("nav.4")}</p>
               </NavLink>
            </nav>
            <div
               onClick={() => {
                  console.log("deslogado com sucesso");
                  localStorage.clear();
               }}
               id={styles.baixo}
            >
               {token && (
                  <>
                     <FaSignOutAlt />
                     <p>{t("nav.5")}</p>
                  </>
               )}
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
