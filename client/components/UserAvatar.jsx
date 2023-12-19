import { Avatar, Dropdown } from "flowbite-react";
import { getInitials } from "../utils/functions";
import Cookies from "js-cookie";
import { Axios } from "../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";

const UserAvatar = ({ token, setToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fullName = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo")).name
    : "";
  const email = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo")).email
    : "";
  const handleLogout = async () => {
    try {
      toast.loading("Waiting...");
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
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
      {/* <Dropdown.Item>Dashboard</Dropdown.Item> */}
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item disabled={isLoading} onClick={() => handleLogout()}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default UserAvatar;
