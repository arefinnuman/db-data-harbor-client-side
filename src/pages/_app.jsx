/* eslint-disable react-hooks/exhaustive-deps */

import store from "@/redux/store";
import { clearUser, setUser } from "@/redux/user/userSlice";
import "@/styles/globals.css";
import jwtDecode from "jwt-decode";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider, useDispatch } from "react-redux";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

function InitUser({ children }) {
  const dispatch = useDispatch();

  function getUserFromToken() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          return decodedToken;
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }
    return null;
  }

  useEffect(() => {
    const userFromToken = getUserFromToken();
    if (userFromToken) {
      dispatch(setUser(userFromToken));
    } else {
      dispatch(clearUser());
    }
  }, []);

  return children;
}

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
          <InitUser>{getLayout(<Component {...pageProps} />)}</InitUser>
          <Toaster />
        </Provider>
      </div>
    </>
  );
}
