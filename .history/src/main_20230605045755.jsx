import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import MetamaskProvider from "./connectors";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;
function getLibrary(provider) {
  return new Web3(provider, "any");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
        <App />
      </MetamaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);
