import { createContext, useContext } from "react";

const MusicContext = createContext();

export const MusicReducer = (state, action) => {
   switch (action.type) {
      case "setMusicaAtual":
         return { ...state, musicaAtual: action.payload };
      case "setTargetAtual":
         return { ...state, targetAtual: action.payload };
      case "setaSeguir":
         return { ...state, aSeguir: action.payload };
      case "setIdAlbum":
         return { ...state, idAlbum: action.payload };
      case "setIdPlaylist":
         return { ...state, idPlaylist: action.payload };
      case "setPlaylists":
         return { ...state, playlists: action.payload };
      case "setisPlaying":
         return { ...state, isPlaying: action.payload };
      case "setRepetir":
         return { ...state, repetir: action.payload };
      case "setAudioRef":
         return { ...state, audioRef: action.payload };
      case "setSemelhantes":
         return { ...state, semelhantes: action.payload };
      case "setPlaylistsDestacadas":
         return { ...state, playlistsDestacadas: action.payload };
      case "setLancamentos":
         return { ...state, lancamentos: action.payload };
      case "setAlbumsSalvos":
         return { ...state, albumsSalvos: action.payload };
      case "setMusicasCurtidas":
         return { ...state, musicasCurtidas: action.payload };
      case "setAlbumAtual":
         return { ...state, albumAtual: action.payload };
      case "setMode":
         return { ...state, mode: action.payload };
      case "setSingleMode":
         return { ...state, singleMode: action.payload };
      case "setTop50":
         return { ...state, top50: action.payload };
      case "setArtistasTop":
         return { ...state, artistasTop: action.payload };
      case "setCategorias":
         return { ...state, categorias: action.payload };
      case "setPlaylistsCategoria":
         return { ...state, playlistsCategoria: action.payload };
      case "setAleatorio":
         return { ...state, aleatorio: action.payload };
      case "setIdioma":
         return { ...state, idioma: action.payload };
      case "setLogado":
         return { ...state, logado: action.payload };

      default:
         return state;
   }
};

export const MusicInitialState = {
   musicaAtual: [], // objecto Musica selecionada para tocar
   targetAtual: 0, // Index da música atual
   aSeguir: [], // Musicas da playlist criada
   idAlbum: "", // Id do Album selecionado
   idPlaylist: "", // Id da playlist selecionado
   playlists: [], // Playlists do usuário no spotify
   isPlaying: false, // Música tocando ou não
   repetir: false, // Ativar loop de música ou não
   audioRef: new Audio(undefined), // estado do Audio que será inicializado
   semelhantes: [], // Artistas semelhantes
   playlistsDestacadas: [], // Playlists em destaque
   lancamentos: [], // Lancamentos em destaque
   mode: "", //   Modos: playlistMode ou albumMode
   singleMode: false,
   albumsSalvos: [], // Albuns favoritos da conta do spotify
   musicasCurtidas: [], // Músicas favoritos da conta do spotify
   albumAtual: [], // Objecto Album adicionado a playlist
   top50: [], // Playlist contendo top 50 músicas mais escutadas
   artistasTop: null, // Artistas favoritos do usuário
   categorias: [], // Gêneros disponíveis no spotify
   playlistsCategoria: [], // Playlists da categoria selecionada
   aleatorio: false, // Musicas aleatórias ativas ou não,
   idioma: "pt", // Idioma da aplicação
   logado: false,
};

export const MusicProvider = ({ value, children }) => <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;

export const MusicValue = () => useContext(MusicContext);
