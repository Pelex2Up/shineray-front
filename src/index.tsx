import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./store/redux/store";
import { persistStore } from "redux-persist";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { Preloader } from "components/Preloader";
import React from "react";
import { hydrate, render } from "react-dom";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const rootElement = document.getElementById("root");

if (rootElement?.hasChildNodes()) {
  hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Preloader />} persistor={persistor}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>,
    rootElement,
  );
} else {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Preloader />} persistor={persistor}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>,
    rootElement,
  );
}

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
