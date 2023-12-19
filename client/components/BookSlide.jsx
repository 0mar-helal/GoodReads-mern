import { useRouter } from "next/router";
import React, { useState } from "react";
import Rating from "react-rating";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { Axios } from "../api/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useSWRConfig } from "swr";

const BookSlide = ({ book, Fav }) => {
  const { mutate } = useSWRConfig();

  const [isFav, setIsFav] = useState(Fav);
  const router = useRouter();
  const token = Cookies.get("token") || "";
  const { _id, title, author, imageURL, rating } = book;
  const addToFavourite = async () => {
    if (token) {
      setIsFav(true);
      try {
        const res = await Axios.post("user/favourite_book/add", book, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        console.log(res);
        toast.success(res.data.mssge);
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data.mssge);
      }
    } else {
      toast.error("You have to login first!", {
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };
  const removeFromFavourite = async () => {
    setIsFav(false);
    try {
      const res = await Axios.delete(`user/favourite_book/remove/${book._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(res);
      toast.success(res.data.mssge);
      mutate("user/favourite_book");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data.mssge);
    }
  };
  return (
    <div className="py-5 bg-white mb-16">
      <div className="w-full h-[300px] mb-3 relative overflow-hidden">
        <button
          onClick={() => (isFav ? removeFromFavourite() : addToFavourite())}
          className={`bg-gray-400 ${
            isFav ? "text-red-600" : "text-white"
          } p-1 rounded absolute top-2 right-2 z-20 text-xl`}
        >
          {isFav ? <GoHeartFill /> : <GoHeart />}
        </button>
        <img
          onClick={() => router.push(`/book/show/${_id}`)}
          src={imageURL}
          className="block w-full h-full object-cover cursor-pointer hover:scale-105 transition-all"
          alt=""
        />
      </div>
      <div className="w-full flex flex-col text-left gap-2 text-[15px]">
        <h1
          onClick={() => router.push(`/book/show/${_id}`)}
          className="w-fit hover:text-blue-700 hover:underline transition-all cursor-pointer"
        >
          {title}
        </h1>
        <h2 className="w-fit text-gray-600">{author}</h2>
        <Rating
          initialRating={rating}
          emptySymbol={
            <div className="text-[20px] text-yellow-500">
              <ion-icon name="star-outline"></ion-icon>
            </div>
          }
          placeholderSymbol={
            <div className="text-[20px] text-yellow-500">
              <ion-icon name="star-outline"></ion-icon>
            </div>
          }
          fullSymbol={
            <div className="text-[20px] text-yellow-500">
              <ion-icon name="star"></ion-icon>
            </div>
          }
          fractions={4}
          readonly
        />
      </div>
    </div>
  );
};

export default BookSlide;
