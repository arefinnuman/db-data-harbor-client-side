import store from "@/redux/store";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { Provider, useSelector } from "react-redux";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

function InitUser({ children }) {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  return children;
}

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    Modal.setAppElement(document.body);
  }, []);

  return (
    <>
      <Head>
        <title>DB Data Harbor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={poppins.className}>
        <Provider store={store}>
          <InitUser>{getLayout(<Component {...pageProps} />)}</InitUser>
          <Toaster position="bottom-right" />
        </Provider>
      </div>
    </>
  );
}
