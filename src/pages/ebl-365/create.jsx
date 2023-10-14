import CreateEbl365Form from "@/components/Ebl365/CreateEbl365Form";
import RootLayout from "@/layout/RootLayout";

const CreateEbl365Page = () => {
  return (
    <div>
      <CreateEbl365Form />
    </div>
  );
};

export default CreateEbl365Page;

CreateEbl365Page.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
