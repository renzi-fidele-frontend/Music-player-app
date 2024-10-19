import { useState } from "react";
import { MusicValue } from "../context/MusicContext";

const token = localStorage.getItem("token");

const useSpotifyApi = (endpoint, method, onSuccess) => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [data, setData] = useState(null);
   const { dispatch } = MusicValue();

   async function apanharDados() {
      let url = "https://api.spotify.com/v1/" + endpoint;
      setLoading(true);
      const res = await fetch(url, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: method,
      })
         .then((v) =>
            v
               .clone()
               .json()
               .catch(() => v.text())
         )
         .then(async (v) => {
            if (v?.error?.status === 401) {
               dispatch({ type: "setLogado", payload: false });
               return localStorage.clear();
            }
            setData(v);
            onSuccess(v);
         })
         .catch((err) => {
            console.log("Erro ao fetchar o spotify");
            setError(err);
            console.log(err.status);
         })
         .finally(() => {
            setLoading(false);
         });
   }

   async function apanharDadosComParam(novoendpoint) {
      let url = "https://api.spotify.com/v1/" + novoendpoint;
      setLoading(true);
      const res = await fetch(url, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: method,
      })
         .then((v) =>
            v
               .clone()
               .json()
               .catch(() => v.text())
         )
         .then(async (v) => {
            setData(v);
            if (v?.error && v?.error?.message === "The access token expired") {
               console.log("TOken expirou");
               dispatch({ type: "setLogado", payload: false });
               return localStorage.clear();
            }
            onSuccess(v);
         })
         .catch((err) => {
            console.log("Erro ao fetchar o spotify");
            if (err.status === 401) {
               dispatch({ type: "setLogado", payload: false });
               localStorage.clear();
            }
            setError(err);
            console.log(err);
         })
         .finally(() => {
            setLoading(false);
         });
   }

   return { loading, error, data, apanharDados, apanharDadosComParam };
};

export default useSpotifyApi;
