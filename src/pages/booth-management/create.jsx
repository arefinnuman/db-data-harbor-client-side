import CreateBoothManagementForm from "@/components/BoothManagement/CreateBoothManagementForm";
import RootLayout from "@/layout/RootLayout";

const CreateBoothManagementPage = () => {
  return (
    <div>
      <CreateBoothManagementForm />
    </div>
  );
};

export default CreateBoothManagementPage;

CreateBoothManagementPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
