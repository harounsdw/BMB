import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store.js";
import { Provider } from "react-redux";
import Connexion from "./components/connexion/connexion.jsx";
import Admin from "./components/admin/admin.jsx";
import Formation from "./components/formation/formation.jsx";
import Condition from "./components/condition/condition.jsx";
import Vision from "./components/vision/vision.jsx";
import About from "./components/about/about.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Connexion />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/condition" element={<Condition />} />
      <Route path="/formation" element={<Formation />} />
      <Route path="/vision" element={<Vision />} />
      <Route path="/about" element={<About />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
