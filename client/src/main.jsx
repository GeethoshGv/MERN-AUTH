import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/style.scss";
import { store, persistor } from "./redux/Store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);
