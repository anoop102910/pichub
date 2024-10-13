import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fontsource/urbanist";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import store from "./store";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
    <ToastContainer position="bottom-center"/>
  </React.StrictMode>);
