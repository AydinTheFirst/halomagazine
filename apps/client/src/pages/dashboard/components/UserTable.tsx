import { useHTTP } from "@/hooks";
import { http, httpError } from "@/lib";
import { IUser } from "@/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const UsersTable = () => {
  const { data: users } = useHTTP<IUser[]>("/users");

  if (!users) return <div>Loading...</div>;

  const deleteOne = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;

    try {
      await http.delete(`/users/${id}`);
      toast.success("User deleted");
      location.reload();
    } catch (error) {
      httpError(error);
    }
  };

  return (
    <>
      <div>
        <Button as={Link} to="/dashboard/users/new" color="success">
          Add User
        </Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>Admin ?</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Button
                    as={Link}
                    to={`/dashboard/users/${user.id}`}
                    color="success"
                    size="sm"
                    isIconOnly
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    isIconOnly
                    onClick={() => deleteOne(user.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
