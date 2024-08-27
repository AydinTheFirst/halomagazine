import { HomeLayout } from "@/layouts/Home/Layout";
import { UsersTable } from "./components/UserTable";
import { CategoryTable } from "./components/CategoryTable";
import { MagazineTable } from "./components/MagazineTable";

export const Dashboard = () => {
  return (
    <HomeLayout>
      <div className="container my-10">
        <div className="row g-3">
          <div className="col-md-6">
            <UsersTable />
          </div>
          <div className="col-md-6">
            <CategoryTable />
          </div>
          <div className="col-md-6">
            <MagazineTable />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};
