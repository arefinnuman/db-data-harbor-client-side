import SingleTerminalComponent from "@/components/Terminals/SingleTerminalComponent";
import RootLayout from "@/layout/RootLayout";

const SingleTerminalPage = () => {
  return (
    <>
      <SingleTerminalComponent />
    </>
  );
};

export default SingleTerminalPage;

SingleTerminalPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

