import BannerSlider from "../BannerSlider";
import SearchBar from "../SearchBar";

const Banner = () => {
  return (
    <>
      <div className=" bg-teal-100 pt-[70px]">
        <div className="mx-auto w-full lg:px-[80px] px-12 flex flex-col md:flex-row justify-between gap-12">
          <div className="md:w-1/2 w-full flex flex-col gap-8">
            {/* header and text */}
            <h1 className="text-4xl w-full font-bold">
              Buy and sell your books{" "}
              <span className="text-blue-700">for the best prices</span>
            </h1>
            <p>
              To get the best prices for your books, explore online marketplaces
              like Amazon and eBay, specialized websites that offer instant
              price quotes, and local bookstores that buy used books. Social
              media groups can also be a source for great deals.
            </p>
            {/* Search bar */}
            <SearchBar type="outsideSearchPage" />
          </div>
          <div className="md:w-1/2 w-full">
            <BannerSlider />
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#d5f5f6"
          fill-opacity="0.85"
          d="M0,128L48,154.7C96,181,192,235,288,224C384,213,480,139,576,106.7C672,75,768,85,864,106.7C960,128,1056,160,1152,154.7C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default Banner;
