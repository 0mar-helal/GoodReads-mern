import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { FaUpload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { useState } from "react";

const SideBar = () => {
  const [sidebarList, setSidebarList] = useState([
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: HiChartPie,
      isSelected: false,
    },
    {
      label: "Upload Book",
      link: "/dashboard/upload_book",
      icon: FaUpload,
      isSelected: false,
    },
    {
      label: "Manage Books",
      link: "/dashboard/manage_books",
      icon: IoMdSettings,
      isSelected: false,
    },
    {
      label: "Edit Book",
      link: "/dashboard/edit_book/",
      icon: HiChartPie,
      isSelected: false,
    },
  ]);
  // const handleSelect = (item) => {
  //   const updateSidebarList = sidebarList.map((sidebarItem) => {
  //     return item === sidebarItem
  //       ? { ...sidebarItem, isSelected: true }
  //       : sidebarItem;
  //   });
  //   setSidebarList(updateSidebarList);
  // };
  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Logo
        className="text-4xl text-[#1c2434] font-bold"
        href="#"
        img="/books-store.png"
        imgAlt="Flowbite logo"
      >
        Books Store
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {sidebarList.map((item) => (
            <Sidebar.Item
              // onClick={() => handleSelect(item)}
              // className={item.isSelected ? "bg-gray-100" : ""}
              key={item.link}
              href={item.link}
              icon={item.icon}
            >
              {item.label}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
