import { Spinner } from "@nextui-org/react";
export const Loader = () => {
  return (
    <>
      <div className="container grid h-56 place-items-center">
        <Spinner size="lg" color="warning" />
      </div>
    </>
  );
};
