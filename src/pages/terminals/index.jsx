import TerminalsComponent from "@/components/Terminals/TerminalsComponent";
import RootLayout from "@/layout/RootLayout";

const TerminalsPage = () => {
  return (
    <div>
      <TerminalsComponent />
    </div>
  );
};

export default TerminalsPage;

TerminalsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

