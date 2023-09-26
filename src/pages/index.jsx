import WelcomeSection from "@/components/Home/WelcomeSection";
import RootLayout from "@/layout/RootLayout";
import { clearUser, setUser } from "@/redux/user/userSlice";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();
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
    if (userFromToken) {
      dispatch(setUser(userFromToken));
    } else {
      dispatch(clearUser());
    }
  }, []);

  return (
    <main>
      <WelcomeSection />
    </main>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
