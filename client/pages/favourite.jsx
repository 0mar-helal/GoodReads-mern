import Cookies from "js-cookie";
import React, { useEffect } from "react";
import useSWR from "swr";
import { Axios } from "../api/axios";
import BookSlide from "../components/BookSlide";
import Layout from "../components/Layout";

const token = Cookies.get("token") || "";

const fetcher = async () => {
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
const Favourite = () => {
  const { data, isLoading } = useSWR("user/favourite_book", fetcher);
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  console.log(data);

  return (
    <div className="min-h-screen items-center bg-white mt-[70px] mb-[40px]">
      <h1 className="my-heading">Favourite Book</h1>
      <div className="px-6 md:px-12 flex flex-wrap gap-4 gap-y-6 mb-12">
        {data?.map((book) => (
          <BookSlide book={book} Fav={true} />
        ))}
        {data?.length === 0 ? (
          <h1 className="text-4xl w-fit mx-auto">Noting Here, plz Add</h1>
        ) : null}
      </div>
    </div>
  );
};

export default Favourite;

Favourite.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
