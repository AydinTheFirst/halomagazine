import { Loader } from "@/components/Loader";
import { Wrapper } from "@/components/Wrapper";
import { useHTTP } from "@/hooks";
import { CDN, http, httpError } from "@/lib";
import { ICategory, IMagazine } from "@/types";
import {
  Button,
  Input,
  Progress,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

export const Magazines = () => {
  const { magazineId } = useParams<{ magazineId: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data: magazine, isLoading } = useHTTP<IMagazine>(
    magazineId !== "new" ? `/magazines/${magazineId}` : "",
  );

  const { data: categories } = useHTTP<ICategory[]>("/categories");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      magazine
        ? await http.put(`/magazines/${magazineId}`, data, {
            onUploadProgress: (progressEvent) => {
              setUploadProgress(
                (progressEvent.loaded / progressEvent.total!) * 100,
              );
            },
          })
        : await http.post("/magazines", data, {
            onUploadProgress: (progressEvent) => {
              setUploadProgress(
                (progressEvent.loaded / progressEvent.total!) * 100,
              );
            },
          });
      toast.success(magazine ? "Magazine updated" : "Magazine created");
    } catch (error) {
      httpError(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setSelectedImage(reader.result as string);
  };

  if (isLoading || !categories) return <Loader />;

  if (uploadProgress > 0 && uploadProgress < 100) {
    return (
      <Wrapper>
        <div className="text-center">
          <h1 className="mb-3 text-3xl font-bold">Rana bekle yükleniyor...</h1>
          <Progress showValueLabel value={uploadProgress} isStriped />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h1 className="mb-3 text-center text-3xl font-bold">
          {magazine ? "Update" : "Create"} Magazine
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="row g-3">
        <Input
          label="Title"
          type="text"
          name="title"
          defaultValue={magazine?.title}
          className="col-md-6"
        />

        <Select
          label="Category"
          name="categoryId"
          defaultSelectedKeys={[magazine?.categoryId || ""]}
          className="col-md-6"
        >
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.title}
            </SelectItem>
          ))}
        </Select>

        <Textarea
          label="Description"
          name="description"
          defaultValue={magazine?.description}
          className="col-12"
        />

        <div className="flex items-center gap-3">
          <Input
            label="Cover"
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleImageChange}
            variant="underlined"
          />

          {magazine && (
            <img
              src={selectedImage || CDN + magazine.thumbnail}
              alt={magazine.title}
              className="mt-3 h-20 w-20 rounded-lg"
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          <Input
            label="PDF"
            type="file"
            name="file"
            accept="application/pdf"
            variant="underlined"
          />
          {magazine && (
            <Link to={CDN + magazine.file} target="_blank" rel="noreferrer">
              <Button color="success">View PDF</Button>
            </Link>
          )}
        </div>

        <div>
          <Button type="submit" color="secondary" fullWidth>
            {magazine ? "Update" : "Create"} Magazine
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};
