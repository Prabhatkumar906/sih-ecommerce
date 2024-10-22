// import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App.jsx';  // No need for curly braces with a default export

import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";

const root =createRoot(document.getElementById('root'));
  root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster/>
    </Provider>
  </BrowserRouter>
);
