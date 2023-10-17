import CreateTerminalForm from "@/components/Terminals/CreateTerminalForm";
import RootLayout from "@/layout/RootLayout";

const CreateTerminalPage = () => {
  return (
    <div>
      <CreateTerminalForm />
    </div>
  );
};

export default CreateTerminalPage;

CreateTerminalPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
