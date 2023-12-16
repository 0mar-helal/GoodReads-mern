import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Avatar, Rating } from "flowbite-react";
const ReviewSlider = () => {
  const reviews = [
    {
      rating: 4,
      comment:
        "I absolutely love this online bookstore! The website is user-friendly, making it easy to navigate and find the books I'm interested in",
      profileImage: "/assets/profile.jpg",
      fullName: "Lily P",
      jobTitle: "CEO, Tech Company",
    },
    {
      rating: 5,
      comment:
        "I've been a loyal customer of this online bookstore for years, and I couldn't be happier.",
      profileImage: "/assets/profile.jpg",
      fullName: "David S",
      jobTitle: "Student",
    },
    {
      rating: 3.5,
      comment:
        "This online bookstore is a gem! The browsing experience is delightful, with intuitive search filters and personalized recommendations based on my reading preferences",
      profileImage: "/assets/profile.jpg",
      fullName: "Emily R",
      jobTitle: "Doctor",
    },
    {
      rating: 4.5,
      comment:
        "I recently discovered this online bookstore, and it has quickly become my go-to place for all my book purchases",
      profileImage: "/assets/profile.jpg",
      fullName: "Mark L",
      jobTitle: "Software Engineer",
    },
  ];
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      modules={[Pagination]}
      className="customer-swiper"
    >
      {reviews.map((review) => (
        <SwiperSlide className="flex flex-col gap-4 mb-[100px]">
          <Rating>
            <Rating.Star filled={review.rating > 0} />
            <Rating.Star filled={review.rating > 1} />
            <Rating.Star filled={review.rating > 2} />
            <Rating.Star filled={review.rating > 3} />
            <Rating.Star filled={review.rating > 4} />
          </Rating>
          <p className="my-3">{review.comment}</p>
          <div className="flex items-start my-3">
            <Avatar img={review.profileImage} alt="avatar of Jese" rounded />
          </div>
          <h1 className="font-bold mb-3">{review.fullName}</h1>
          <span>{review.jobTitle}</span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewSlider;
