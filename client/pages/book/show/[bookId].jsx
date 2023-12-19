import { useRouter } from "next/router";
import Rating from "react-rating";
import useSWR from "swr";
import { Axios } from "../../../api/axios";
import Layout from "../../../components/Layout";

const fetcher = async (pageIndex) => {
  try {
    const res = await Axios(pageIndex);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const BookDetails = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const { data, isLoading } = useSWR(`books/search/${bookId}`, fetcher);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  // const { title, author, description, rating, imageURL, genres } = data;

  return (
    <div className="min-h-screen px-4 py-[70px] grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col gap-5 col-span-1">
        <div className="w-full flex justify-center">
          <img
            className="w-[200px] object-contain"
            src={data?.imageURL}
            alt=""
          />
        </div>
        {/* <button className="flex items-center justify-center gap-2 p-3 rounded mx-auto bg-green-400 text-white font-bold">
          <FaCartShopping />
          Add To Cart
        </button> */}
        <Rating
          className="mx-auto"
          initialRating={0}
          emptySymbol={
            <div className="text-[30px] text-yellow-500">
              <ion-icon name="star-outline"></ion-icon>
            </div>
          }
          placeholderSymbol={
            <div className="text-[30px] text-yellow-500">
              <ion-icon name="star-outline"></ion-icon>
            </div>
          }
          fullSymbol={
            <div className="text-[30px] text-yellow-500">
              <ion-icon name="star"></ion-icon>
            </div>
          }
          fractions={4}
        />
        <span className="text-[16px] mx-auto">Rate this book</span>
      </div>
      <div className="flex flex-col gap-3 col-span-2">
        <h1 className="text-5xl font-bold">{data?.title}</h1>
        <h2 className="text-2xl">{data?.author}</h2>
        <div className="flex items-center gap-3">
          <Rating
            readonly
            initialRating={data?.rating}
            emptySymbol={
              <div className="text-[30px] text-yellow-500">
                <ion-icon name="star-outline"></ion-icon>
              </div>
            }
            placeholderSymbol={
              <div className="text-[30px] text-yellow-500">
                <ion-icon name="star-outline"></ion-icon>
              </div>
            }
            fullSymbol={
              <div className="text-[30px] text-yellow-500">
                <ion-icon name="star"></ion-icon>
              </div>
            }
            fractions={4}
          />
          <span className="text-2xl font-bold">{data?.rating}</span>
        </div>
        <p className="my-6">{data?.description}</p>
        <div className="flex item-center gap-3 text-[15px]">
          <span>Genres</span>
          <ul className="flex gap-3 flex-wrap items-center">
            {data?.genres.map((genre) => (
              <li
                key={genre}
                className="pb-2 border-b border-solid border-green-500 font-bold"
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

BookDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
