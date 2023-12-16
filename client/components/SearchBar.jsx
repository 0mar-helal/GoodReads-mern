const SearchBar = () => {
  const handleChange = () => {};
  const handleClick = () => {};

  return (
    <div className="bg-transparent flex items-center">
      <input
        className="focus:outline-none border-none p-2 bg-white rounded-l-[10px]"
        type="search"
        name="search"
        id="search"
        placeholder="Search..."
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
        className="p-2 bg-blue-700 text-white text-[15px] rounded-r-[10px] font-bold"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
