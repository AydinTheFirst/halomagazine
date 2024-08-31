import { HomeLayout } from "@/layouts/Home/Layout";
import { UsersTable } from "./components/UserTable";
import { CategoryTable } from "./components/CategoryTable";
import { MagazineTable } from "./components/MagazineTable";
import { Tabs, Tab, Button, ButtonGroup } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <HomeLayout>
      <div className="container my-10 grid">
        <ButtonGroup>
          <Button as={Link} to={"/dashboard/users/new"}>
            Add User
          </Button>
          <Button as={Link} to={"/dashboard/categories/new"}>
            Add Category
          </Button>
          <Button as={Link} to={"/dashboard/magazines/new"}>
            Add Magazine
          </Button>
        </ButtonGroup>

        <Tabs>
          <Tab title="Users" children={<UsersTable />} />
          <Tab title="Categories" children={<CategoryTable />} />
          <Tab title="Magazines" children={<MagazineTable />} />
        </Tabs>
      </div>
    </HomeLayout>
  );
};
