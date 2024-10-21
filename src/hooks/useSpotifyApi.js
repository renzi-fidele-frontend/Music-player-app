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
            if (v?.error?.status === 401) {
               dispatch({ type: "setLogado", payload: false });
               return localStorage.clear();
            }
            setData(v);
            onSuccess(v);
         })
         .catch((err) => {
            console.log(err);
            setError(err);
         })
         .finally(() => {
            setLoading(false);
         });
   }

   return { loading, error, data, apanharDados, apanharDadosComParam };
};

export default useSpotifyApi;
