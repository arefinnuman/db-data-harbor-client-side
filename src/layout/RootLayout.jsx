/* eslint-disable react-hooks/exhaustive-deps */

import { setUser } from "@/redux/auth/authSlice";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FooterComponent from "../components/Ui/FooterComponent";
import NavbarComponent from "../components/Ui/NavbarComponent";
import SidebarComponent from "../components/Ui/SidebarComponent";

export default function RootLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      window.location.href = "/login";
    }
  }, []);

  const getUserFromToken = () => {
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
  };

  useEffect(() => {
    const userFromToken = getUserFromToken();
    dispatch(setUser({ user: userFromToken }));
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="flex min-h-screen">
        <SidebarComponent />

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto p-4">{children}</div>
          </main>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
