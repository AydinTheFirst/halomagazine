import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/index.css";

import { App } from "./pages/App";
import { ToastBox } from "./components/Toast";
import { Login } from "./pages/Login";
import { Hakkimizda } from "./pages/Hakkimizda";
import { Iletisim } from "./pages/Iletisim";
import { NotFound } from "./pages/NotFound";

document.body.classList.add("bg-slate-100", "dark:bg-gray-900");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ToastBox />
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/iletisim" element={<Iletisim />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </>
);
