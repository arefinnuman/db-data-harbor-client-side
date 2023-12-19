import SingleIssueFormComponent from "@/components/IssueForm/SingleIssueFormComponent";
import RootLayout from "@/layout/RootLayout";

const SingleIssueFormPage = () => {
  return (
    <div>
      <SingleIssueFormComponent />
    </div>
  );
};

export default SingleIssueFormPage;

SingleIssueFormPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
