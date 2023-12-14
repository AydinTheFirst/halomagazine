import { useEffect, useState } from "react";
import { rest } from "../utils/REST";
import { Button, Modal, Table, TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { InspectMagazine } from "./InspectMagazine";

export const Search = () => {
  const [data, setData] = useState<any[any] | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchData = async () => {
    const res = await rest.get("/categories", {});
    if (!res.ok) return rest.error(res);
    setData(res.data);
  };

  useEffect(() => {
    if (!data) fetchData();
  }, [data]);

  if (!data) return;

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <i className="fa-solid fa-search md:me-2"></i>
        <span className="hidden md:block">Ara</span>
      </Button>

      <SearchModal
        data={data}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

const SearchModal = (props: {
  data: any;
  openModal: boolean;
  setOpenModal: any;
}) => {
  const { openModal, setOpenModal, data } = props;
  const magazines: any[any] = [];

  for (const cat of data) {
    for (const m of cat.magazines) {
      m.cat = cat.title;
      magazines.push(m);
    }
  }

  const [filter, setFilter] = useState<any | null>(magazines);

  const handleSearch = (e: any) => {
    const arr = magazines.filter((m: any) =>
      m.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilter(arr);
  };

  return (
    <Modal
      position={"center"}
      show={openModal}
      onClose={() => setOpenModal(false)}
      style={{ zIndex: 1000 }}
    >
      <Modal.Header>Dergilerde Ara</Modal.Header>
      <Modal.Body>
        <div className="flex mb-5">
          <TextInput
            type="text"
            icon={FaSearch}
            placeholder="Mart sayısı"
            className="w-full"
            onChange={handleSearch}
          ></TextInput>
        </div>

        <span className="text-black dark:text-white">
          <i className="fa-solid fa-warning me-2 text-yellow-500"></i>
          Mobil cihazlarda incele butonunu görmek için listeyi sola doğru
          kaydırınız!
        </span>

        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Dergi Adı</Table.HeadCell>
              <Table.HeadCell>Kategori</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filter.map((m: any, i: number) => (
                <Row key={i} m={m} />
              ))}
            </Table.Body>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const Row = (props: { m: any }) => {
  const { m } = props;

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {m.title}
        </Table.Cell>
        <Table.Cell>{m.cat}</Table.Cell>
        <Table.Cell>
          <Button onClick={() => setOpenModal(true)}>İncele</Button>
        </Table.Cell>
      </Table.Row>

      <InspectMagazine
        data={m}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
