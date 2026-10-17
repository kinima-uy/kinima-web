import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import { MotionProvider, MotionToggle } from "./lib/motion.jsx";
import Home from "./pages/Home.jsx";
import Photography from "./pages/Photography.jsx";
import Robotec from "./pages/Robotec.jsx";
import Cursor from "./components/Cursor.jsx";
import "./styles.css";
import { SHOW_PHOTOGRAPHY } from "./config.js";

/* En Netlify se usa BrowserRouter (URLs reales como /fotografia). La vista previa usa MemoryRouter. */
const Router = import.meta.env.VITE_PREVIEW ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {SHOW_PHOTOGRAPHY && <Route path="/fotografia" element={<Photography />} />}
          <Route path="/robotec" element={<Robotec />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
      <MotionToggle />
      <Cursor />
    </MotionProvider>
  </StrictMode>
);
