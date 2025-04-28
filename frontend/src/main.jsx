import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { WagmiConfigProvider } from "./Wagmi.jsx";
import { BrowserRouter } from "react-router-dom";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <WagmiConfigProvider>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </WagmiConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
