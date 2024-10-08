import { useState } from "react";

const token = localStorage.getItem("token");

const useSpotifyApi = (endpoint, method, onSuccess) => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [data, setData] = useState(null);

   async function apanharDados() {
      let url = "https://api.spotify.com/v1/" + endpoint;
      setLoading(true);
      const res = await fetch(url, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
         method: method,
      })
         .then((v) => v?.json())
         .then(async (v) => {
            setData(v);
            if (v?.error && v?.error?.message === "The access token expired") {
               return localStorage.clear();
            }
            onSuccess(v);
         })
         .catch((err) => {
            setError(err);
            console.log(err);
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
         .then((v) => v?.json())
         .then(async (v) => {
            setData(v);
            if (v?.error && v?.error?.message === "The access token expired") {
               return localStorage.clear();
            }
            onSuccess(v);
         })
         .catch((err) => {
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
