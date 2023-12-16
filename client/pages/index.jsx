import Banner from "../components/Home/Banner";
import BooksSection from "../components/Home/BooksSection";
import FavBooks from "../components/Home/FavBooks";
import PromoBanner from "../components/Home/PromoBanner";
import Reviews from "../components/Home/Reviews";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <div>
      <Banner />
      <BooksSection title="Best Seller Books" page={0} />
      <FavBooks />
      <PromoBanner />
      <BooksSection title="Other Books" page={1} />
      <Reviews />
    </div>
  );
};

export default Home;

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
