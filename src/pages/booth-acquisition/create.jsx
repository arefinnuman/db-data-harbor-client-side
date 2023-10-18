import CreateBoothAcquisitionForm from "@/components/BoothAcquisition/CreateBoothAcquisitionForm";
import RootLayout from "@/layout/RootLayout";

const CreateBoothAcquisitionPage = () => {
  return (
    <div>
      <CreateBoothAcquisitionForm />
    </div>
  );
};

export default CreateBoothAcquisitionPage;

CreateBoothAcquisitionPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
