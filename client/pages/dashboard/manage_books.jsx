import { Modal, Rating, Table } from "flowbite-react";
import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import useSWR from "swr";
import { Axios } from "../../api/axios";
import { IoMdSettings } from "react-icons/io";
import Swal from "sweetalert2";
import BookModal from "../../components/Dashboard/BookModal";

const fetcher = async () => {
  try {
    const res = await Axios("/books");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const ManageBooks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const { data, isLoading, mutate } = useSWR(`getAllBooks`, fetcher);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const handleShowAlert = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure of deleting this book?",
      text: "Do you want to continue",
      icon: "warning",
      confirmButtonText: "Yes",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        handleDelete(id);
      }
    });
  };
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Please Waiting",
        text: "the book is deleting...",
        icon: "info",
        timer: 1000,
      });
      await Axios.delete(`books/${id}`);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        timer: 1500,
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="py-[60px] px-5 w-full min-h-screen bg-[#f1f5f9]">
      <div className="flex justify-between items-center mb-12">
        <h1 className="dashboard-heading">
          <IoMdSettings />
          Manage Books
        </h1>
        <div className="text-xl text-[#717f95]">
          Dashboard / <span className="text-blue-700">Manage Books</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>genres</Table.HeadCell>
            <Table.HeadCell>Rating</Table.HeadCell>
            <Table.HeadCell>Manage</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.map((book) => (
              <Table.Row
                key={book._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.title}
                </Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>
                  {book.genres.map((genre, indx) => {
                    const capitalizeGenre = genre
                      ? genre[0].toUpperCase() + genre.slice(1)
                      : "";
                    return indx >= book.genres.length - 1
                      ? capitalizeGenre
                      : capitalizeGenre + ", ";
                  })}
                </Table.Cell>
                <Table.Cell>
                  <Rating>
                    <Rating.Star />
                    <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                      {book.rating}
                    </p>
                  </Rating>
                </Table.Cell>
                <Table.Cell className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setOpenModal(true);
                    }}
                    className=" rounded font-medium p-2 bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleShowAlert(book._id)}
                    className="bg-red-600 rounded p-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <BookModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedBook={selectedBook}
        mutate={mutate}
      />
    </div>
  );
};

export default ManageBooks;

ManageBooks.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
