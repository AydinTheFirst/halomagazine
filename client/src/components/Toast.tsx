import { Toast } from "flowbite-react";

export const ToastBox = () => {
  return (
    <Toast id="toast" className="fixed end-0 bottom-0 m-3 z-10 invisible">
      <div className="flex items-start w-100 relatives">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300">
          <img src="/logo.png" alt="logo" className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">
          <span
            id="toast-title"
            className="mb-1 text-sm font-semibold text-gray-900 dark:text-white"
          >
            Update available
          </span>
          <div id="toast-body" className="mb-2 text-sm font-normal">
            A new software version is available for download.
          </div>
        </div>
        <Toast.Toggle className="absolute top-0 end-0 m-1" />
      </div>
    </Toast>
  );
};
