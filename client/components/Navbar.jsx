import { useEffect, useState } from "react";
import Link from "next/link";
import { Sling as Hamburger } from "hamburger-react";
import Cookies from "js-cookie";
// import UserAvatar from "./UserAvatar";
import { Avatar, Dropdown } from "flowbite-react";
import { getInitials } from "../utils/functions";
import { Axios } from "../api/axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [isLoading, setIsLoading] = useState(false);
  const fullName = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo")).name
    : "";
  const email = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo")).email
    : "";
  useEffect(() => {
    setDomLoaded(true);
  }, [token]);
  const navLinks = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Shop",
      link: "/shop",
    },
    {
      label: "Favourite",
      link: "/favourite",
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setIsSticky(true);
      else setIsSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await Axios.post("logout", { token });
      Cookies.remove("token");
      Cookies.remove("userInfo");
      setToken(null);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {domLoaded && (
        <header
          className={`w-full ${
            isSticky ? "sticky top-0 right-0 bg-blue-300 z-50" : "bg-teal-100"
          }`}
        >
          <nav className="container mx-auto flex justify-between py-3 px-5 ">
            {/* Logo */}
            <Link
              href="/"
              className="text-[20px] font-bold italic text-blue-700 flex gap-1 items-end"
            >
              <div className="block w-[40px] h-[40px]">
                <img className="img-fluid" src="/logo.png" alt="" />
              </div>
              GoodReads
            </Link>
            <div className="flex items-center gap-3">
              {/* ul large */}
              <ul className="hidden md:flex gap-[40px] items-center px-2">
                {navLinks.map(({ link, label }) => (
                  <li
                    className="text-base text-black uppercase cursor-pointer hover:text-blue-700 transition-all"
                    key={link}
                  >
                    <Link href={link}>{label}</Link>
                  </li>
                ))}
                <span className="hidden w-px h-6 bg-gray-500 md:block"></span>
                {/* login & signup */}
                {!token ? (
                  <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
                    <li>
                      <Link
                        href="/login"
                        className="block cursor-pointer py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="btn-primary cursor-pointer"

                        // className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </div>
                ) : null}
              </ul>
              {/* Avatar */}
              {token ? (
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <div>
                      <Avatar
                        className="block cursor-pointer select-none"
                        placeholderInitials={getInitials(fullName)}
                        rounded
                      />
                    </div>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{fullName}</span>
                    <span className="block truncate text-sm font-medium">
                      {email}
                    </span>
                  </Dropdown.Header>
                  {/* <Dropdown.Item>Dashboard</Dropdown.Item> */}
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item
                    disabled={isLoading}
                    onClick={() => handleLogout()}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              ) : null}
              {/* menu icon */}
              <div className="md:hidden flex justify-center items-center z-50">
                <Hamburger size={25} toggled={menuOpen} toggle={setMenuOpen} />
              </div>
            </div>
          </nav>
          {/* ul small */}
          <ul
            className={`${
              menuOpen ? "flex" : "hidden"
            } flex-col fixed left-0 top-[72px] ${
              isSticky ? "bg-blue-300" : "bg-teal-100"
            }  w-full gap-[10px] items-center px-2 py-4 justify-center`}
          >
            {navLinks.map(({ link, label }) => (
              <li
                className="text-base text-black uppercase cursor-pointer hover:text-blue-700 transition-all"
                key={link}
              >
                <Link href={link}>{label}</Link>
              </li>
            ))}
          </ul>
        </header>
      )}
    </>
  );
};

export default Navbar;
