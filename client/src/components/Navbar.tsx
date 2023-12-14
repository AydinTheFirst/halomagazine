import { DarkThemeToggle, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Search } from "./Search";

export const NavbarComponent = () => {
  const [logo, setLogo] = useState<string>("/dark.png");
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const setPadding = () => {
    const navbar = document.getElementById("navbar");
    document.body.style.paddingTop = navbar?.offsetHeight + "px";
  };

  useEffect(() => {
    setPadding();
    const html = document.querySelector("html");
    setIsDarkTheme(html?.classList.contains("dark") ?? false);
    setLogo(html?.classList.contains("dark") ? "/dark.png" : "/light.png");

    const handleThemeToggle = () => {
      setIsDarkTheme((prevTheme) => !prevTheme);
      const newLogo = !isDarkTheme ? "/dark.png" : "/light.png";
      setLogo(newLogo);
    };

    document
      .getElementById("btn")
      ?.addEventListener("click", handleThemeToggle);

    return () => {
      document
        .getElementById("btn")
        ?.removeEventListener("click", handleThemeToggle);
    };
  }, [isDarkTheme]);

  const searchVisible = location.pathname === "/";

  return (
    <Navbar
      id="navbar"
      className="py-5 px-10 border-b fixed w-full top-0 left-0 p-3"
      style={{ zIndex: 100 }}
    >
      <Navbar.Brand href="/">
        <img src={logo} alt="logo" width={100} />
      </Navbar.Brand>

      <div className="flex md:order-2 gap-1 ms-1">
        {searchVisible && <Search />}
        <DarkThemeToggle
          id="btn"
          className="bg-violet-800 text-white hover:text-white hover:bg-purple-700 dark:hover:bg-purple-700 dark:text-white"
        />
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link href="/">Anasayfa</Navbar.Link>
        <Navbar.Link href="/hakkimizda">Hakkımızda</Navbar.Link>
        <Navbar.Link href="/iletisim">İletişim</Navbar.Link>
        <div></div>
        <Navbar.Link href="https://www.instagram.com/haloidergisi/">
          <i className="fa-brands fa-instagram"></i>
        </Navbar.Link>
        <Navbar.Link href="https://tr.linkedin.com/company/halo-edebiyat-dergisi">
          <i className="fa-brands fa-linkedin"></i>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
