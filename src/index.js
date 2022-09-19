import React from 'react';
import {createRoot} from "react-dom/client";
import './index.css';
import App from "./routes/App"

createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
