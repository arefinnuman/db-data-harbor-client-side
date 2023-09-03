import SingleEbl365Components from "@/components/Ebl365/SingleEbl365Components";
import RootLayout from "@/layout/RootLayout";

const SingleEbl365Page = () => {
  return (
    <div>
      <SingleEbl365Components />
    </div>
  );
};

export default SingleEbl365Page;

SingleEbl365Page.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

