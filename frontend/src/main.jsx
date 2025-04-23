import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { WagmiConfigProvider } from "./Wagmi.jsx";
import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <WagmiConfigProvider>
        <App />
      </WagmiConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
