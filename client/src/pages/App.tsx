import { Button, Card } from "flowbite-react";
import { Footer } from "../components/Footer";
import { NavbarComponent } from "../components/Navbar";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { rest } from "../utils/REST";
import { CDN } from "../config";
import { InspectMagazine } from "../components/InspectMagazine";

import { Snow } from "./Snow";

export const App = () => {
  useEffect(() => {}, []);

  return (
    <>
      <NavbarComponent />

      <Snow />

      <main className="container mx-auto mt-5 dark:text-white p-5">
        <section className="h-[100vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-center items-center p-3">
              <div>
                <span className="text-6xl font-bold">HALO</span>

                <p className="text-xl font-bold">
                  Aylık Fikir, Sanat ve Edebiyat Dergisi
                </p>
                <br />
                <p className=" text-lg">
                  Bölümümüze ve öğrencilerine katkı sağlamak amacıyla, diğer
                  fakülteler dahil olmak üzere; ortaya bir fikir- edebiyat
                  dergisi sunmak için bir araya gelmiş bir grup öğrenciyiz.
                </p>

                <br />

                <div>
                  <Button href="#cats" className="w-[10rem]">
                    Okumaya başla
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center -order-1 md:order-1">
              <img src="/banner.png" alt="logo" className="rounded-xl p-1" />
            </div>
          </div>
        </section>

        <div id="cats"></div>
        <Magazines />
      </main>

      <Footer />
    </>
  );
};

const Magazines = () => {
  const [data, setData] = useState<any[any] | null>(null);

  const fetchData = async () => {
    const res = await rest.get("/categories", {});
    if (!res.ok) return rest.error(res);
    setData(res.data);
  };

  useEffect(() => {
    if (!data) fetchData();
  }, [data]);

  if (!data) return <Loader />;

  return data.map((c: any, i: number) => (
    <section key={i} className="p-5">
      <div>
        <span className="flex text-3xl pb-3 border-b">{c.title}</span>
        <div className="flex mt-5 gap-5 overflow-auto">
          {c.magazines.reverse().map((m: any, i: number) => (
            <CardBox key={i} data={m} />
          ))}
        </div>
      </div>
    </section>
  ));
};

const CardBox = (props: { data: any }) => {
  const { data } = props;

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Card
        className="rounded"
        style={{ width: 180 }}
        renderImage={() => (
          <img
            src={CDN + data.thumbnail}
            width={200}
            style={{ minWidth: "180px" }}
            alt="image"
          />
        )}
      >
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
        <Button onClick={() => setOpenModal(true)}>İncele</Button>
      </Card>

      <InspectMagazine
        data={data}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
