import { Spinner } from "@nextui-org/react";
export const Loader = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-full w-full bg-slate-100">
        <div className="flex h-full items-center justify-center">
          <Spinner size="lg" color="warning" />
        </div>
      </div>
    </>
  );
};
