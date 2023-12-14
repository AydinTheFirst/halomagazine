import { Button, Modal } from "flowbite-react";
import { CDN } from "../config";

export const InspectMagazine = (props: {
  data: any;
  openModal: any;
  setOpenModal: any;
}) => {
  const { data, openModal, setOpenModal } = props;

  return (
    <Modal
      dismissible
      show={openModal}
      onClose={() => setOpenModal(false)}
      className="z-10 overflow-auto text-black dark:text-white"
      style={{ zIndex: 1000 }}
    >
      <Modal.Header>{data.title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <img
            src={CDN + data.thumbnail}
            width={300}
            className="flex mx-auto"
            alt=""
          />

          <p>{data.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button href={CDN + data.file} color="success" className="w-full">
          Dergiyi İndir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
