import React from "react";
import styles from "./SideBar.module.css";
import { Link, NavLink } from "react-router-dom";

// React Icons
import { FaGripfire, FaSignOutAlt } from "react-icons/fa";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { AiFillHeart } from "react-icons/ai";
import { RiLayout2Fill } from "react-icons/ri";
import { IoLibrarySharp } from "react-icons/io5";

// Imagens
import avatar from "../../assets/avatar1.gif"

const SideBar = () => {
   // Estilo de botao ativo
   const ativo = { color: "white", backgroundColor: "rgb(200, 116, 75)", scale: "1.1" };

   return (
      <div id={styles.container}>
         <div className={styles.imgCont}>
            <img src={avatar} alt="user" />
         </div>

         <nav>
            <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/feed"}>
               <i>
                  <RiLayout2Fill />
               </i>
               <p>Feed</p>
            </NavLink>
            <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/destaque"}>
               <i>
                  <FaGripfire />
               </i>
               <p>Destaque</p>
            </NavLink>
            <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/leitor"}>
               <i>
                  <TbPlayerPlayFilled />
               </i>
               <p>Leitor</p>
            </NavLink>
            <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/favoritos"}>
               <i>
                  <AiFillHeart />
               </i>
               <p>Favoritos</p>
            </NavLink>
            <NavLink style={({ isActive }) => (isActive ? ativo : undefined)} to={"/biblioteca"}>
               <i>
                  <IoLibrarySharp />
               </i>
               <p>Biblioteca</p>
            </NavLink>
         </nav>

         <div id={styles.baixo}>
            <FaSignOutAlt />
            <p>Deslogar</p>
         </div>
      </div>
   );
};

export default SideBar;
