import { Route, Routes } from "react-router-dom";

import { NotFound } from "@/pages/NotFound";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";

export const AuthRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
