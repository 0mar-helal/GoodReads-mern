import { useRouter } from "next/router";
import { useRef } from "react";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";

const SearchBar = ({ type, setSearchString }) => {
  const router = useRouter();
  const inputRef = useRef();
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputRef.current.value.length > 0) {
      handleClick();
    }
  };
  const handleClick = () => {
    if (inputRef.current.value.length > 0) {
      if (type === "outsideSearchPage") {
        router.push(`/search/${inputRef.current.value}`);
      } else {
        setSearchString(inputRef.current.value);
      }
    } else {
      toast.error("Please write a word before submit.");
    }
  };

  return (
    <div className="flex bg-gray-100 border-1 border-gray-400 border-solid rounded-full max-w-fit p-2">
      <input
        ref={inputRef}
        className="focus:outline-none border-none focus:shadow-none p-2 bg-transparent w-[250px] text-black"
        type="search"
        name="search"
        id="search"
        placeholder="Try searching book by title"
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button
        onClick={handleClick}
        className="p-2 text-black text-[20px] font-bold"
      >
        <IoSearch />
      </button>
    </div>
  );
};

export default SearchBar;
