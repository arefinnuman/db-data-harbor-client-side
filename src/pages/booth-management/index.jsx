import BoothManagementComponent from "@/components/BoothManagement/BoothManagementComponent";
import RootLayout from "@/layout/RootLayout";

const BoothManagementPage = () => {
  return (
    <div>
      <BoothManagementComponent />
    </div>
  );
};

export default BoothManagementPage;

BoothManagementPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
