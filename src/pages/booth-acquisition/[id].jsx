import SingleBoothAcquisition from "@/components/BoothAcquisition/SingleBoothAcquisition";
import RootLayout from "@/layout/RootLayout";

const SingleBoothAcquisitionPage = () => {
  return (
    <div>
      <SingleBoothAcquisition />
    </div>
  );
};

export default SingleBoothAcquisitionPage;

SingleBoothAcquisitionPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
