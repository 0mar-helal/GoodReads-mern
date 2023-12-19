import React, { useState } from "react";
import { Card, Rating } from "flowbite-react";
import { useRouter } from "next/router";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { Axios } from "../api/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useSWRConfig } from "swr";

const token = Cookies.get("token") || "";

const BookCard = ({ book, Fav }) => {
  const { mutate } = useSWRConfig();
  const { _id, title, author, imageURL, rating, description } = book;
  const router = useRouter();
  const [isFav, setIsFav] = useState(Fav);

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
    <Card className="max-w-sm mx-auto">
      <img
        onClick={() => router.push(`/book/show/${_id}`)}
        src={imageURL}
        alt=""
        className="h-96 cursor-pointer"
      />
      <h5
        onClick={() => router.push(`/book/show/${_id}`)}
        className="text-xl font-bold tracking-tight text-gray-900 cursor-pointer"
      >
        {title}
      </h5>
      <h6 className="w-fit text-gray-600">{author}</h6>
      <Rating>
        <Rating.Star filled={rating > 0} />
        <Rating.Star filled={rating > 1} />
        <Rating.Star filled={rating > 2} />
        <Rating.Star filled={rating > 3} />
        <Rating.Star filled={rating > 4} />
      </Rating>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description.length > 120
          ? description.slice(0, 120) + "..."
          : description}
      </p>
      {isFav ? (
        <button
          onClick={() => removeFromFavourite()}
          className="btn-primary flex items-center justify-center !gap-3 hover:bg-blue-800 transition-all"
        >
          <GoHeartFill />
          Remove From Fav
        </button>
      ) : (
        <button
          onClick={() => addToFavourite()}
          className="btn-primary flex items-center justify-center !gap-3 hover:bg-blue-800 transition-all"
        >
          <GoHeart />
          Add To Fav
        </button>
      )}
    </Card>
  );
};

export default BookCard;
