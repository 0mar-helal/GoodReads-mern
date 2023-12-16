import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import useSWR from "swr";
import BookSlide from "./BookSlide";
import { Axios } from "../api/axios";
import Cookies from "js-cookie";

const token = Cookies.get("token") || "";

const fetcher = async (pageIndex) => {
  try {
    const res = await Axios(pageIndex);
    console.log(res);
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

const BooksSlider = ({ page }) => {
  const { data: dataFav, isLoading: isLoadingFav } = useSWR(
    `user/favourite_book`,
    fetcherFav
  );
  const { data, isLoading } = useSWR(`/books?p=${page}`, fetcher);

  if (isLoading || isLoadingFav) {
    return <h1>Loading...</h1>;
  }
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
      modules={[Pagination]}
      className="books-swiper"
    >
      {data?.map((book) => (
        <SwiperSlide key={book._id}>
          <BookSlide
            book={book}
            Fav={dataFav?.find((favBook) => favBook._id === book._id)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BooksSlider;
