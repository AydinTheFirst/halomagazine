import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";

import { HiUser, HiLockClosed } from "react-icons/hi";

import { useEffect, useState } from "react";
import { rest } from "../utils/REST";

export const Login = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="flex justify-center items-center p-10 my-10"
    >
      <div
        style={{ width: "300px" }}
        className="shadow bg-slate-50 dark:bg-slate-700 rounded w-auto p-5"
      >
        <div className="flex justify-center">
          <img src="/logo.png" width={100} alt="" />
        </div>
        <div className="text-center">
          <span className="dark:text-white text-xl font-bold">
            Fristroop Development
          </span>
          <hr className="m-3" />
        </div>

        <Base />
      </div>
    </div>
  );
};

const Base = () => {
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirectTo");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await rest.get(rest.routes.Auth.Me, {});
      if (res.ok) return location.replace("/dashboard");
    };
    if (localStorage.getItem("token")) fetch();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target as HTMLFormElement);
    const res = await rest.post(rest.routes.Auth.Login, data);

    if (!res.ok) {
      setLoading(false);
      return rest.error(res);
    }

    rest.setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    location.replace(redirectTo || "/dashboard");
  };

  return (
    <>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username1" value="Username" />
          </div>
          <TextInput
            id="username1"
            name="username"
            type="text"
            icon={HiUser}
            placeholder="elonmusk123"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput
            id="password1"
            name="password"
            type={show ? "text" : "password"}
            icon={HiLockClosed}
            placeholder="elonmusk123"
            required
          />
        </div>
        <div className="flex justify-end items-center gap-1">
          <Checkbox id="show1" onChange={() => setShow(!show)} />
          <Label htmlFor="show1">Show Password</Label>
        </div>
        {loading ? (
          <Button>
            <Spinner aria-label="Spinner button example" size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}
      </form>
    </>
  );
};
