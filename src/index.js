import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { Provider } from "react-redux";


const API_URL = process.env.REACT_APP_API_URL || "https://stellsi-backend.onrender.com";


const originalFetch = window.fetch;
window.fetch = async (resource, config = {}) => {
  if (typeof resource === 'string' && resource.startsWith('/api/')) {
    resource = `${API_URL}${resource}`;
  }

  return originalFetch(resource, {
    ...config,
    credentials: config.credentials || 'omit' 
  });
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
