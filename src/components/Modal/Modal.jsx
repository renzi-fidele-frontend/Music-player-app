import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";
import ReactModal from "react-modal";
import estiloBiblioteca from "../../pages/Biblioteca/Biblioteca.module.css";

import Swiper3d from "../Swiper3d/Swiper3d";
import { MusicValue } from "../../context/MusicContext";
import { useTranslation } from "react-i18next";

ReactModal.setAppElement("#root");

const Modal = () => {
   const { t } = useTranslation();
   const { estado } = MusicValue();

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
      if (loc.hash === "#artistas-semelhantes") {
         aberto();
      } else {
         setIsOpen(false);
      }
   }, [loc.hash]);

   const contentStyle = {
      background: "rgba(49, 47, 68, 0.8)",
      backdropFilter: "blur( 11px )",
      WebkitBackdropFilter: "blur( 11px )",
      borderRadius: "10px",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
      paddingInline: "0px",
      paddingTop: "3em",
   };

   const overlayStyle = {
      zIndex: 5,
      backdropFilter: "blur(7px)",
      WebkitBackdropFilter: "blur(7px)",
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
         <h2 className={estiloBiblioteca.tit1}>{t("pages.leitor.modal")}</h2>
         <div className={styles.artistsCt}>
            {estado?.semelhantes?.length > 0 ? (
               <Swiper3d arr={estado?.semelhantes} />
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
