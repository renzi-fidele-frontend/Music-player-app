import styles from "./ArtistCard.module.css";
import Esqueleto from "../Skeletons/Esqueleto";
import { MusicValue } from "../../context/MusicContext";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ foto, nome, idArtista }) => {
   const { dispatch } = MusicValue();
   const navegar = useNavigate();
   
   return (
      <div
         id={styles.ct}
         onClick={() => {
            dispatch({ type: "setMode", payload: "playlistMode" });
            dispatch({ type: "setIdPlaylist", payload: "" });
            dispatch({ type: "setTargetAtual", payload: 0 });
            dispatch({ type: "setIdAlbum", payload: "" });
            dispatch({ type: "setSingleMode", payload: true });
            navegar("/leitor", { state: { idArtistaFavorito: idArtista } });
         }}
      >
         {nome ? (
            nome &&
            foto && (
               <>
                  <img loading="lazy" src={foto} alt={`foto de ${nome}`} />
                  <p>{nome}</p>
               </>
            )
         ) : (
            <>
               <Esqueleto tipo={"imgCircular"} />
               <Esqueleto tipo={"texto"} />
            </>
         )}
      </div>
   );
};

export default ArtistCard;
