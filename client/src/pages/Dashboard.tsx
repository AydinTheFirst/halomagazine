import { useEffect, useState } from "react";
import { rest } from "../utils/REST";
import { Routes } from "../utils/Routes";
import {
  Button,
  FileInput,
  Footer,
  Label,
  List,
  Modal,
  Navbar,
  Select,
  Table,
  TextInput,
  Textarea,
} from "flowbite-react";
import { Theme } from "../components/Theme";

import { ICategory } from "../../../server/src/helpers/schemas/category";
import { IMagazine } from "../../../server/src/helpers/schemas/magazine";
import { toast } from "../utils/toast";

export const Dashboard = () => {
  const [data, setData] = useState<ICategory[] | null>(null);

  const fetchMe = async () => {
    const res = await rest.get(Routes.Auth.Me, {});
    if (!res.ok) return location.replace("/login");
  };

  const fetchData = async () => {
    const res = await rest.get(Routes.Categories(), {});
    if (!res.ok) return location.replace("/login");

    setData(res.data);
  };

  useEffect(() => {
    fetchMe();
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Nav />
      <Theme />

      <main className="max-w-2xl dark:text-white mx-auto p-3">
        <div className="my-10"></div>
        <section>
          <Magazines data={data} />
        </section>
        <hr className="my-10" />
        <section>
          <Categories data={data} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export const Nav = () => {
  return (
    <Navbar>
      <Navbar.Brand href="/dashboard">
        <img
          src="/logo.png"
          className="mr-3 h-6 sm:h-9 rounded-full"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Halo Dashboard
        </span>
      </Navbar.Brand>

      <List unstyled>
        <Navbar.Link href="/">Anasayfa</Navbar.Link>
      </List>
    </Navbar>
  );
};

const Magazines = (props: { data: ICategory[] }) => {
  const { data } = props;

  const magazines: any[] = [];

  for (const category of data) {
    for (const magazine of category.magazines) {
      magazines.push(magazine);
    }
  }

  const findCat = (catId: string) => {
    const cat = data.find((c) => c.id === catId);
    return cat?.title;
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [d, setD] = useState<IMagazine | null>(null);

  const handleClick = (id: string) => {
    const magazine = magazines.find((c) => c.id === id);
    if (!magazine) return;
    setD(magazine);
    setOpenModal(true);
  };

  const handleOpen = () => {
    setD(null);
    setOpenModal(true);
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap justify-between items-center">
        <span className="text-2xl font-bold">Dergiler</span>
        <Button color="success" onClick={handleOpen}>
          Dergi Ekle
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Başlık</Table.HeadCell>
            <Table.HeadCell>Kategori</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {magazines.reverse().map((d, i) => (
              <Table.Row
                key={i}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{d.id}</Table.Cell>
                <Table.Cell>{d.title}</Table.Cell>
                <Table.Cell>{findCat(d.catId)}</Table.Cell>
                <Table.Cell>
                  <Button color="blue" onClick={() => handleClick(d.id)}>
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <MagazineModal
        data={d}
        categories={data}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

const MagazineModal = (props: {
  data: IMagazine | null;
  categories: ICategory[];
  openModal: boolean;
  setOpenModal: any;
}) => {
  const { data, openModal, setOpenModal, categories } = props;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);

    let res = null;

    if (!data?.id) {
      res = await rest.post(Routes.Magazines(), form);
    } else {
      res = await rest.put(Routes.Magazines(data.id), form);
    }

    if (!res.ok) return rest.error(res);

    location.reload();
  };

  const handleDelete = async () => {
    const ok = confirm("Silmek istediğinize emin misiniz?");
    if (!ok) return;

    const res = await rest.delete(Routes.Magazines(data?.id), {});
    if (!res.ok) return rest.error(res);
    location.reload();
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header className="border-b" />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id" value="ID" />
              </div>
              <TextInput
                id="id"
                name="id"
                defaultValue={data?.id}
                readOnly
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Başlık" />
              </div>
              <TextInput
                id="title"
                name="title"
                defaultValue={data?.title}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Açıklama" />
              </div>
              <Textarea
                id="description"
                name="description"
                className="p-3"
                defaultValue={data?.description}
                rows={10}
                cols={30}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="catId" value="Kategori" />
              </div>
              <Select
                id="catId"
                name="catId"
                defaultValue={data?.catId}
                required
              >
                {categories.map((c, i) => (
                  <option key={i} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="thumbnail"
                  value={"Thumbnail | " + data?.thumbnail}
                />
              </div>
              <FileInput id="thumbnail" name="thumbnail" accept="image/*" />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="file" value={"PDF | " + data?.file} />
              </div>
              <FileInput id="file" name="file" accept="application/pdf" />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="timestamp" value="Oluşturulma Tarihi" />
              </div>
              <TextInput
                id="timestamp"
                name="timestamp"
                defaultValue={data?.timestamp || Date.now()}
                readOnly
                required
              />
            </div>

            <div className="w-full">
              {data?.id ? (
                <div className="flex gap-5">
                  <Button type="submit">Kaydet</Button>
                  <Button type="button" color="red" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              ) : (
                <Button type="submit" color="success">
                  Oluştur
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

const Categories = (props: { data: ICategory[] }) => {
  const { data } = props;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [d, setD] = useState<ICategory | null>(null);

  const handleClick = (id: string) => {
    const category = data.find((c) => c.id === id);
    if (!category) return;
    setD(category);
    setOpenModal(true);
  };

  const handleOpen = () => {
    setD(null);
    setOpenModal(true);
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap justify-between items-center">
        <span className="text-2xl font-bold">Kategoriler</span>
        <Button color="green" onClick={handleOpen}>
          Kategori Ekle
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Başlık</Table.HeadCell>
            <Table.HeadCell>Dergiler</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((d, i) => (
              <Table.Row
                key={i}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{d.id}</Table.Cell>
                <Table.Cell>{d.title}</Table.Cell>
                <Table.Cell>{d.magazines.length}</Table.Cell>
                <Table.Cell>
                  <Button color="blue" onClick={() => handleClick(d.id)}>
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <CategoryModal
        data={d}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

const CategoryModal = (props: {
  data: ICategory | null;
  openModal: boolean;
  setOpenModal: any;
}) => {
  const { data, openModal, setOpenModal } = props;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);

    let res = null;

    if (!data?.id) {
      res = await rest.post(Routes.Categories(), form);
    } else {
      res = await rest.put(Routes.Categories(data.id), form);
    }

    if (!res.ok) return rest.error(res);

    location.reload();
  };

  const handleDelete = async () => {
    const ok = confirm("Silmek istediğinize emin misiniz?");
    if (!ok) return;

    const res = await rest.delete(Routes.Categories(data?.id), {});
    if (!res.ok) return rest.error(res);
    location.reload();
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id" value="ID" />
              </div>
              <TextInput
                id="id"
                name="id"
                defaultValue={data?.id}
                readOnly
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Başlık" />
              </div>
              <TextInput
                id="title"
                name="title"
                defaultValue={data?.title}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Açıklama" />
              </div>
              <TextInput
                id="description"
                name="description"
                defaultValue={data?.description}
                required
              />
            </div>

            <div className="w-full">
              {data?.id ? (
                <div className="flex gap-5">
                  <Button type="submit">Kaydet</Button>
                  <Button type="button" color="red" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              ) : (
                <Button type="submit" color="success">
                  Oluştur
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
