const remove = () => {
  document.getElementById("toast")?.classList.add("invisible");
};

export const toast = (body?: { title?: string; message?: string }) => {
  const title = body?.title || "Fristroop Development";
  const message = body?.message || "Hello World!";

  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toast-title");
  const toastBody = document.getElementById("toast-body");

  console.log(toast, toastTitle, toastBody);

  const ok = toast && toastTitle && toastBody;
  if (!ok) return alert(`${title}\n${message}`);

  toastTitle!.innerHTML = title;
  toastBody!.innerHTML = message;

  toast.classList.remove("invisible");

  setTimeout(() => {
    remove();
  }, 5000);
};
