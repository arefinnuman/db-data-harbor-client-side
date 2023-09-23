import store from "@/redux/store";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>DB Data Harbor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={poppins.className}>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
          <Toaster />
        </Provider>
      </div>
    </>
  );
}
