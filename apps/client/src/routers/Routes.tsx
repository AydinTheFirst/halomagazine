import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { DashboardRouter } from "./DashboardRouter";
import { NotFound } from "@/pages/NotFound";
import { App } from "@/pages/App";
import { GetMagazine } from "@/pages/GetMagazine";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Team } from "@/pages/Team";
import { Profile } from "@/pages/Profile";

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/magazines/:magazineId" element={<GetMagazine />} />
          <Route path="/*" element={<AuthRouter />} />
          <Route path="/dashboard/*" element={<DashboardRouter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
