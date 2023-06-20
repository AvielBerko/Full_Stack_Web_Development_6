import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import initJPHGetLoader from "./lib/data/loders/jsonPlaceholder/jsonPlaceHolderGetLoader.ts";
import initJPHSaveLoader from "./lib/data/loders/jsonPlaceholder/jsonPlaceHoldergetSavers.ts";
import initExpressGetLoader from "./lib/data/loders/express/expressGetLoader.ts";
import initExpressSaveLoader from "./lib/data/loders/express/expressGetSavers.ts";

//setup database managers (DI container)
// initJPHGetLoader();
// initJPHSaveLoader();
initExpressGetLoader();
initExpressSaveLoader();


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
