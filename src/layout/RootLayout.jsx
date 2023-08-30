import FooterComponent from "../components/Ui/FooterComponent";
import NavbarComponent from "../components/Ui/NavbarComponent";

export default function RootLayout({ children }) {
  return (
    <>
      <NavbarComponent />
      <div className="container mx-auto min-h-screen">{children}</div>
      <FooterComponent />
    </>
  );
}

