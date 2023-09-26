import IssueFormComponent from "@/components/IssueForm/IssueFormComponent";
import RootLayout from "@/layout/RootLayout";

const IssueFormPage = () => {
  return (
    <div>
      <IssueFormComponent />
    </div>
  );
};

export default IssueFormPage;

IssueFormPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
