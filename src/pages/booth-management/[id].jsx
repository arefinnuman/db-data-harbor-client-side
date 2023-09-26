import SingleBoothManagementComponent from "@/components/BoothManagement/SingleBoothManagementComponent";
import RootLayout from "@/layout/RootLayout";

const SingleBoothManagementPage = () => {
  return (
    <div>
      <SingleBoothManagementComponent />
    </div>
  );
};

export default SingleBoothManagementPage;

SingleBoothManagementPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
