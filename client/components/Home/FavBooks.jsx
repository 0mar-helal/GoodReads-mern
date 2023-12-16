import Link from "next/link";

const FavBooks = () => {
  return (
    <div className="lg:px-[100px] px-12 py-[50px] flex flex-col md:flex-row items-center gap-[100px]">
      <div className="md:w-1/2">
        <img
          className="w-full h-[500px] object-cover"
          src="/assets/favoritebook.jpg"
          alt=""
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="font-bold text-5xl">
          Find Your Favorite <span className="text-blue-700">Book Here!</span>{" "}
        </h1>
        <p className="my-4 leading-7">
          Finding your favorite book has never been easier! With numerous
          resources available, you can discover and acquire your beloved reads
          in no time.
        </p>
        <div className="flex flex-wrap gap-y-6 items-center justify-between mb-5">
          <div className="flex flex-col gap-3 font-bold">
            <span className="text-[25px]">800+</span>
            <span>Book Listener</span>
          </div>
          <div className="flex flex-col gap-3 font-bold">
            <span className="text-[25px]">550+</span>
            <span>Register Users</span>
          </div>
          <div className="flex flex-col gap-3 font-bold">
            <span className="text-[25px]">1200+</span>
            <span>PDF Downloads</span>
          </div>
        </div>
        <Link
          href={"/shop"}
          className="border-none outline-none bg-blue-700 text-white font-bold px-4 py-2 rounded"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default FavBooks;
