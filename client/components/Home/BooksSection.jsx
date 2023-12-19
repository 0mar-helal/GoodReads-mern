import BooksSlider from "../BooksSlider";

const BooksSection = ({ title, page }) => {
  return (
    <div className="pb-[50px] lg:px-[80px] px-12">
      <h1 className="my-heading">{title}</h1>
      <BooksSlider page={page} />
    </div>
  );
};

export default BooksSection;
