import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import i18n from "./i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Suspense fallback={<p>Loading...</p>}>
         <App />
      </Suspense>
   </React.StrictMode>
);
