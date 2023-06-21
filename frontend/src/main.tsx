import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import initExpressGetLoader from "./lib/data/loders/express/expressGetLoader.ts";
import initExpressSaveLoader from "./lib/data/loders/express/expressGetSavers.ts";

initExpressGetLoader();
initExpressSaveLoader();


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
