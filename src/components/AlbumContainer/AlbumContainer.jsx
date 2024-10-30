import styles from "./AlbumContainer.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { MusicValue } from "../../context/MusicContext";
import { reduzir } from "../../utils/reduzirTexto";
import ftSpotify from "../../assets/Primary_Logo_Green_RGB.svg";

const AlbumContainer = ({ track, propRef }) => {
   const { t } = useTranslation();
   const { estado } = MusicValue();

   if (estado.mode === "playlistMode" && estado.singleMode === false) {
      return (
         <div ref={propRef} id={styles.cont}>
            <div id={styles.imgsCont}>
               <a target="blank" href={track?.external_urls?.spotify}>
                  <img src={ftSpotify} alt="Spotify logo" />
                  <span>Ver no Spotify</span>
               </a>
               <img src={track?.album?.images[0]?.url} alt={t("comps.albumCt.imgAlt")} />
               <div id={styles.imgSombra}>
                  <img src={track?.album?.images[0]?.url} alt={t("comps.albumCt.imgAlt")} />
               </div>
            </div>

            <div id={styles.animCont}>
               <div id={styles.deslizar}>
                  <h5>{track?.album?.name}</h5>
               </div>
            </div>

            <p>{`${track?.album?.name} ${t("comps.albumCt.what")} ${track?.album?.artists
               ?.map((v) => v.name)
               .join(t("comps.albumCt.prefix"))}, ${t("comps.albumCt.has")} ${track?.album?.total_tracks} ${t("comps.albumCt.music")}(s)`}</p>

            <span>{`${t("comps.albumCt.release")}: ${track?.album?.release_date}`}</span>

            {/*Icone de fechar escondido */}
            <i
               id={styles.botaoFechar}
               onClick={() => {
                  propRef.current.className = "";
               }}
            >
               <IoMdCloseCircle />
            </i>
         </div>
      );
   } else if (estado.mode === "albumMode") {
      return (
         <div ref={propRef} id={styles.cont}>
            <div id={styles.imgsCont}>
               <a target="blank" href={estado?.albumAtual[0]?.external_urls?.spotify}>
                  <img src={ftSpotify} alt="Spotify logo" />
                  <span>Ver no Spotify</span>
               </a>
               <img src={estado.albumAtual[0]?.images[0].url} alt={t("comps.albumCt.imgAlt")} />
               <div id={styles.imgSombra}>
                  <img src={estado.albumAtual[0]?.images[0].url} alt={t("comps.albumCt.imgAlt")} />
               </div>
            </div>

            <div id={styles.animCont}>
               <div id={styles.deslizar}>
                  <h5>{estado.albumAtual[0]?.name}</h5>
               </div>
            </div>

            <p>{`${estado.albumAtual[0]?.name} ${t("comps.albumCt.what")} ${estado.albumAtual[0]?.artists
               ?.map((v) => v.name)
               .join(t("comps.albumCt.prefix"))}, ${t("comps.albumCt.has")} ${estado.albumAtual[0]?.total_tracks} ${t(
               "comps.albumCt.music"
            )}(s)`}</p>

            <span>{`${t("comps.albumCt.release")}: ${estado.albumAtual[0]?.release_date}`}</span>

            {/*Icone de fechar escondido */}
            <i
               id={styles.botaoFechar}
               onClick={() => {
                  propRef.current.className = "";
               }}
            >
               <IoMdCloseCircle />
            </i>
         </div>
      );
   } else if (estado.mode === "playlistMode" && estado.singleMode === true) {
      return (
         <div ref={propRef} id={styles.cont}>
            <div id={styles.imgsCont}>
               <a target="blank" href={estado.musicaAtual[0]?.external_urls?.spotify}>
                  <img src={ftSpotify} alt="Spotify logo" />
                  <span>Ver no Spotify</span>
               </a>
               <img src={estado.musicaAtual[0]?.album?.images[0]?.url} alt={t("comps.albumCt.imgAlt")} />
               <div id={styles.imgSombra}>
                  <img src={estado.musicaAtual[0]?.album?.images[0]?.url} alt={t("comps.albumCt.imgAlt")} />
               </div>
            </div>

            <div id={styles.animCont}>
               <div id={styles.deslizar}>
                  <h5>{estado.musicaAtual[0]?.album?.name}</h5>
               </div>
            </div>

            <p>{`${reduzir(estado.musicaAtual[0]?.album?.name, 20)} ${t("comps.albumCt.what")} ${reduzir(
               estado.musicaAtual[0]?.artists?.map((v) => v.name).join(t("comps.albumCt.prefix")),
               20
            )}, ${t("comps.albumCt.has")} ${estado.musicaAtual[0]?.album?.total_tracks} ${t("comps.albumCt.music")}(s)`}</p>

            <span>{`${t("comps.albumCt.release")}: ${estado.musicaAtual[0]?.album?.release_date}`}</span>

            {/*Icone de fechar escondido */}
            <i
               id={styles.botaoFechar}
               onClick={() => {
                  propRef.current.className = "";
               }}
            >
               <IoMdCloseCircle />
            </i>
         </div>
      );
   }
};

export default AlbumContainer;
