import { useState } from "react";
import useSWR from "swr";
import { Axios } from "../api/axios";
import BookCard from "../components/BookCard";
import Layout from "../components/Layout";
import Cookies from "js-cookie";
import BookCardSkelton from "../components/BookCardSkelton";

const token = Cookies.get("token") || "";

const fetcher = async (pageIndex) => {
  try {
    const res = await Axios(pageIndex.url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const fetcherFav = async () => {
  try {
    const res = await Axios("user/favourite_book", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const Page = ({ index }) => {
  const { data: dataFav, isLoading: isLoadingFav } = useSWR(
    token ? `user/favourite_book` : null,
    fetcherFav
  );
  const { data, isLoading } = useSWR(
    { url: `/books?p=${index}`, page: "shop" },
    fetcher
  );

  if (isLoading || isLoadingFav) {
    let listOfSkelton = [];
    for (let i = 0; i < 5; i++) {
      listOfSkelton.push(<BookCardSkelton />);
    }
    return listOfSkelton.map((skelton) => skelton);
  }

  return data.data.map((book) => (
    <BookCard
      key={book._id}
      book={book}
      Fav={dataFav?.find((favBook) => favBook._id === book._id)}
    />
  ));
};

const Shop = () => {
  const [page, setPage] = useState(0);
  const pages = [];
  for (let i = 0; i < page + 1; i++) {
    pages.push(<Page index={i} key={i} />);
  }
  const { data } = useSWR({ url: `/books?p=${page}`, page: "shop" }, fetcher);

  return (
    <div className="min-h-screen mt-[70px] mb-[40px]">
      <h1 className="my-heading">All Books Are Here</h1>
      <div className="px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mb-12">
        {pages}
      </div>
      {data?.moreData ? (
        <button
          className="block border-none outline-none bg-blue-700 text-white font-bold px-4 py-2 rounded w-max mx-auto"
          onClick={() => setPage(page + 1)}
        >
          Load More
        </button>
      ) : null}
    </div>
  );
};

export default Shop;

Shop.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
