import { Label, Modal, Spinner } from "flowbite-react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Axios } from "../../api/axios";
import Rating from "react-rating";
import Select from "react-select";
import { useState } from "react";
import { useSWRConfig } from "swr";

const UpdateBookSchema = Yup.object().shape({
  title: Yup.string("Please enter string value").required("Title is requird"),
  author: Yup.string("Please enter string value").required("Author is requird"),
  imageURL: Yup.string("Please enter string value").required(
    "ImageURL is requird"
  ),
  bookPdfURL: Yup.string("Please enter string value").required(
    "bookPdfURL is requird"
  ),
  genres: Yup.array("").of(Yup.string()).required("Genre is requird"),
  rating: Yup.number().required().min(1),
  description: Yup.string("Please enter string value")
    .required("Description is requird")
    .min(15, "description value is too short")
    .max(800, "description value is too long"),
});
const genresList = [
  "Fantasy",
  "Fiction",
  "Romantic",
  "Psychological",
  "Romantic",
  "Science Fiction",
  "Dystopian",
  "Action",
  "Mystery",
  "Horror",
  "Historical Fiction",
  "Mystery",
];
const options = genresList.map((genre) => {
  return { value: genre.toLowerCase(), label: genre };
});

const BookModal = ({ openModal, setOpenModal, selectedBook }) => {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    title: selectedBook?.title,
    author: selectedBook?.author,
    imageURL: selectedBook?.imageURL,
    bookPdfURL: selectedBook?.bookPdfURL,
    genres: selectedBook?.genres.map((genre) => {
      return { value: genre.toLowerCase(), label: genre };
    }),
    rating: selectedBook?.rating,
    description: selectedBook?.description,
  };
  const submitHandler = async (values) => {
    console.log(values);
    if (typeof values.genres[0] === "object") {
      let list = [];
      for (let i = 0; i < values.genres.length; ++i) {
        list = [...list, values.genres[i].value];
      }
      values.genres = list;
    }
    try {
      setIsLoading(true);
      await Axios.put(`/books/${selectedBook._id}`, values);
      mutate("getAllBooks");
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      dismissible
      show={openModal}
      size="6xl"
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Update Book</Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateBookSchema}
        >
          {({
            values,
            isSubmitting,
            isValid,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => (
            <form onSubmit={(e) => e.preventDefault()} className="w-full py-4">
              <div className="w-full py-4 px-5 grid grid-cols-2 gap-x-4 gap-y-6">
                {/* title */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="title" value="Your Book Title" />
                  </div>
                  <input
                    className={`input-primary  ${
                      touched.title && errors.title
                        ? "!border-red-600   focus:!outline-none"
                        : null
                    }`}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="book's title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    required
                  />
                  <p className="text-red-700 text-[14px]">
                    <ErrorMessage name="title" />
                  </p>
                </div>
                {/* author */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="author" value="Your Book Author" />
                  </div>
                  <input
                    className={`input-primary  ${
                      touched.author && errors.author
                        ? "!border-red-600   focus:!outline-none"
                        : null
                    }`}
                    name="author"
                    id="author"
                    type="text"
                    placeholder="book's author"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                  />
                  <p className="text-red-700 text-[14px]">
                    <ErrorMessage name="author" />
                  </p>
                </div>
                {/* image */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="image" value="Your Image URL" />
                  </div>
                  <input
                    className={`input-primary  ${
                      touched.imageURL && errors.imageURL
                        ? "!border-red-600 focus:!outline-none"
                        : null
                    }`}
                    name="imageURL"
                    id="image"
                    type="text"
                    placeholder="book's image url"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.imageURL}
                  />
                  <p className="text-red-700 text-[14px]">
                    <ErrorMessage name="imageURL" />
                  </p>
                </div>
                {/* pdf Book url */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="bookPdfURL" value="Your Book pdf URL" />
                  </div>
                  <input
                    className={`input-primary  ${
                      touched.bookPdfURL && errors.bookPdfURL
                        ? "!border-red-600 focus:!outline-none"
                        : null
                    }`}
                    name="bookPdfURL"
                    id="bookPdfURL"
                    type="text"
                    placeholder="book's pdf url"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bookPdfURL}
                  />
                  <p className="text-red-700 text-[14px]">
                    <ErrorMessage name="bookPdfURL" />
                  </p>
                </div>
                {/* genres */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="genres" value="Select Your Book Genres" />
                  </div>
                  <input
                    name="genres"
                    className="hidden"
                    onChange={handleChange}
                    type="text"
                  />
                  <Select
                    id="genres"
                    name="genres"
                    isMulti
                    className="input-primary"
                    defaultValue={values.genres}
                    onChange={(selectedOption) => {
                      let list = [];
                      for (let i = 0; i < selectedOption.length; ++i) {
                        list = [...list, selectedOption[i].value];
                      }
                      values.genres = list;
                    }}
                    onBlur={handleBlur}
                    options={options}
                  />
                  <p className="text-red-700 text-[14px]">
                    <ErrorMessage name="genres" />
                  </p>
                </div>
                {/* rating */}
                <div className="col-span-2">
                  <div className="mb-2 block">
                    <Label htmlFor="rating" value="Your Book Rating" />
                  </div>
                  <input
                    className="hidden"
                    name="rating"
                    id="rating"
                    type="text"
                    value={values.rating}
                    onChange={handleChange}
                  />
                  <Rating
                    initialRating={values.rating}
                    value={values.rating}
                    onChange={(rate) => (values.rating = rate)}
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
                  <p className="text-red-700 text-[14px]">
                    <ErrorMessage name="rating" />
                  </p>
                </div>
                {/* description */}
                <div className="col-span-2">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="description"
                      value="Your Book Description"
                    />
                  </div>
                  <textarea
                    className={`input-primary  ${
                      touched.description && errors.description
                        ? "!border-red-600   focus:!outline-none"
                        : null
                    }`}
                    name="description"
                    id="description"
                    placeholder="book's description"
                    required
                    rows={4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <p className="text-red-700 text-[14px]">
                    <ErrorMessage name="description" />
                  </p>
                </div>
              </div>
              {!isLoading ? (
                <button
                  type="submit"
                  hidden={isSubmitting}
                  className={
                    !isValid
                      ? "btn-primary mx-auto !opacity-50 !cursor-not-allowed"
                      : "btn-primary mx-auto"
                  }
                  disabled={!isValid}
                  onClick={() => submitHandler(values)}
                >
                  Update Book
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary flex flex-row gap-3 mx-auto !opacity-50 !cursor-not-allowed"
                >
                  <Spinner aria-label="Spinner button example" size="sm" />
                  Updating...
                </button>
              )}
            </form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default BookModal;
