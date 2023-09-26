import BoothAcquisitionComponent from "@/components/BoothAcqusition/BoothAcquisitionComponent";
import RootLayout from "@/layout/RootLayout";

const BoothAcquisitionPage = () => {
  return (
    <div>
      <BoothAcquisitionComponent />
    </div>
  );
};

export default BoothAcquisitionPage;

BoothAcquisitionPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
