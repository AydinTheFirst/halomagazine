import { useHTTP } from "@/hooks";
import { http, httpError } from "@/lib";
import { ICategory } from "@/types";
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

export const CategoryTable = () => {
  const { data: categories } = useHTTP<ICategory[]>("/categories");

  if (!categories) return <div>Loading...</div>;

  const deleteOne = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this category?");
    if (!ok) return;

    try {
      await http.delete(`/categories/${id}`);
      toast.success("Category deleted");
      location.reload();
    } catch (error) {
      httpError(error);
    }
  };

  return (
    <div>
      <div>
        <Button as={Link} to="/dashboard/categories/new" color="success">
          Add Category
        </Button>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Desc</TableColumn>
          <TableColumn>Magazines</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.title}</TableCell>
              <TableCell>{category.description.substring(0, 10)}</TableCell>
              <TableCell>{category.magazines.length}</TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Button
                    as={Link}
                    to={`/dashboard/categories/${category.id}`}
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
                    onClick={() => deleteOne(category.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
