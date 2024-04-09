import { useHTTP } from "@/hooks";
import { http, httpError } from "@/lib";
import { IMagazine } from "@/types";
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

export const MagazineTable = () => {
  const { data: magazines } = useHTTP<IMagazine[]>("/magazines");

  if (!magazines) return <div>Loading...</div>;

  const deleteOne = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this magazine?");
    if (!ok) return;

    try {
      await http.delete(`/magazines/${id}`);
      toast.success("Magazine deleted");
      location.reload();
    } catch (error) {
      httpError(error);
    }
  };

  return (
    <>
      <div>
        <Button as={Link} to="/dashboard/magazines/new" color="success">
          Add Magazine
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
          {magazines.map((magazine) => (
            <TableRow key={magazine.id}>
              <TableCell>{magazine.title}</TableCell>
              <TableCell>{magazine.categoryId}</TableCell>
              <TableCell>{magazine.timestamp}</TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Button
                    as={Link}
                    to={`/dashboard/magazines/${magazine.id}`}
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
                    onClick={() => deleteOne(magazine.id)}
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
