import React, { useContext } from "react";
import styles from "./AlbumContainer.module.css";
import { musicContext } from "../../App";
import { reduzir } from "../../hooks/useReduzir";
import { IoMdCloseCircle } from "react-icons/io";

const AlbumContainer = ({ track, propRef }) => {
   const { estado, dispatch } = useContext(musicContext);

   if (estado.mode === "playlistMode" && estado.singleMode === false) {
      return (
         <div ref={propRef} id={styles.cont}>
            <div id={styles.imgsCont}>
               <img src={track?.album.images[0].url} alt="Imagem do albúm" />
               <div id={styles.imgSombra}>
                  <img src={track?.album.images[0].url} alt="Imagem do albúm" />
               </div>
            </div>

            <div id={styles.animCont}>
               <div id={styles.deslizar}>
                  <h5>{track?.album.name}</h5>
               </div>
            </div>

            <p>{`${track?.album.name} é um álbum de ${track?.album.artists?.map((v) => v.name).join(" e ")}, que possui ${
               track?.album.total_tracks
            } música(s)`}</p>

            <span>{`Lançado em: ${track?.album.release_date}`}</span>

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
               <img src={estado.albumAtual[0]?.images[0].url} alt="Imagem do album" />
               <div id={styles.imgSombra}>
                  <img src={estado.albumAtual[0]?.images[0].url} alt="Imagem do albúm" />
               </div>
            </div>

            <div id={styles.animCont}>
               <div id={styles.deslizar}>
                  <h5>{estado.albumAtual[0]?.name}</h5>
               </div>
            </div>

            <p>{`${estado.albumAtual[0]?.name} é um álbum de ${estado.albumAtual[0]?.artists?.map((v) => v.name).join(" e ")}, que possui ${
               estado.albumAtual[0]?.total_tracks
            } música(s)`}</p>

            <span>{`Lançado em: ${estado.albumAtual[0]?.release_date}`}</span>

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
               <img src={estado.musicaAtual[0]?.album?.images[0]?.url} alt="Imagem do albúm" />
               <div id={styles.imgSombra}>
                  <img src={estado.musicaAtual[0]?.album?.images[0]?.url} alt="Imagem do albúm" />
               </div>
            </div>

            <div id={styles.animCont}>
               <div id={styles.deslizar}>
                  <h5>{estado.musicaAtual[0]?.album?.name}</h5>
               </div>
            </div>

            <p>{`${reduzir(estado.musicaAtual[0]?.album?.name, 20)} é um álbum de ${reduzir(
               estado.musicaAtual[0]?.artists?.map((v) => v.name).join(" e "),
               20
            )}, que possui ${estado.musicaAtual[0]?.album?.total_tracks} música(s)`}</p>

            <span>{`Lançado em: ${estado.musicaAtual[0]?.album?.release_date}`}</span>

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
