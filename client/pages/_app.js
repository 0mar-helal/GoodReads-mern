// import Layout from "../components/Layout";
import { Fragment } from "react";
import "../styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <Fragment>
      <Head>
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          nomodule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></script>
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
