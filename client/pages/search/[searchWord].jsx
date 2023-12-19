import { useRouter } from "next/router";
import React, { useState } from "react";
import BookCard from "../../components/BookCard";
import { Axios } from "../../api/axios";
import Layout from "../../components/Layout";
import SearchBar from "../../components/SearchBar";
import Cookies from "js-cookie";
import useSWR from "swr";
import { ClapSpinner } from "react-spinners-kit";

const token = Cookies.get("token") || "";

const fetcher = async (pageIndex) => {
  try {
    const res = await Axios(pageIndex.url + pageIndex.args);
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

const SearchResults = () => {
  const router = useRouter();
  const { searchWord } = router.query;
  const [searchString, setSearchString] = useState(searchWord);
  console.log(searchString);
  const { data, isLoading } = useSWR(
    { url: "books/search/", args: searchString },
    fetcher
  );
  const { data: dataFav, isLoading: isLoadingFav } = useSWR(
    token ? `user/favourite_book` : null,
    fetcherFav
  );

  return (
    <section className="min-h-screen mt-[70px] mb-[40px]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-5 mb-10 mx-4">
          <h1 className="my-heading !mx-0 !mb-0">Search Results</h1>
          <SearchBar
            type="insideSearchPage"
            setSearchString={setSearchString}
          />
        </div>
        <div className="px-6 md:px-12">
          {isLoading ? (
            <div className="flex items-center justify-center h-[200px]">
              <ClapSpinner size={50} frontColor="#1a56db" loading={isLoading} />
            </div>
          ) : null}

          {data?.length === 0 ? (
            <div className="flex items-center justify-center h-[200px]">
              <h1 className="text-3xl">Nothing found .Try another word</h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-6 mb-12">
              {data?.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  Fav={dataFav?.find((favBook) => favBook._id === book._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;

SearchResults.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
