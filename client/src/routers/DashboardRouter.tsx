import { Route, Routes } from "react-router-dom";

import { NotFound } from "@/pages/NotFound";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { Users } from "@/pages/dashboard/Users";
import { useHTTP } from "@/hooks";
import { IUser } from "@/types";
import { Categories } from "@/pages/dashboard/Categories";
import { Magazines } from "@/pages/dashboard/Magazines";

export const DashboardRouter = () => {
  const { data: user } = useHTTP<IUser>("/users/@me");

  if (!user) return <div>Loading...</div>;

  if (!user.isAdmin) {
    location.href = "/";
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users/:userId" element={<Users />} />
        <Route path="/categories/:categoryId" element={<Categories />} />
        <Route path="/magazines/:magazineId" element={<Magazines />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
