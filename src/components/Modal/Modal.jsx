import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";
import ReactModal from "react-modal";
import estiloBiblioteca from "../../pages/Biblioteca/Biblioteca.module.css";
import { musicContext } from "../../App";
import ArtistCard from "../ArtistCard/ArtistCard";

ReactModal.setAppElement("#root");

const Modal = () => {
   const { estado, dispatch } = useContext(musicContext);

   const [isOpen, setIsOpen] = useState(false);

   const loc = useLocation();

   const navegar = useNavigate();

   function aberto() {
      setIsOpen(true);
   }

   function fechado() {
      setIsOpen(false);
      navegar(-1);
   }

   useEffect(() => {
      console.log(loc.hash);
      if (loc.hash === "#artistas-semelhantes") {
         aberto();
      }
   }, [loc.hash]);

   const contentStyle = {
      background: "rgba(49, 47, 68, 0.8)",
      backdropFilter: "blur( 4px )",
      WebkitBackdropFilter: "blur( 4px )",
      borderRadius: "10px",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
   };

   const overlayStyle = {
      zIndex: 5,
      backdropFilter: "blur(7px)",
      backgroundColor: "rgba(73, 67, 79, 0.19)",
   };

   return (
      <ReactModal
         style={{
            content: contentStyle,
            overlay: overlayStyle,
         }}
         isOpen={isOpen}
         onRequestClose={fechado}
         id={styles.ct}
      >
         <h2 className={estiloBiblioteca.tit1}>Artistas semelhantes</h2>
         <div className={styles.artistsCt}>
            {estado.semelhantes.length > 0 ? (
               estado.semelhantes.map((v) => <ArtistCard nome={v.name} key={v.id} foto={v.images[2].url} />)
            ) : (
               <>
                  <p></p>
               </>
            )}
         </div>
      </ReactModal>
   );
};

export default Modal;
