import DropAnIssueComponent from "@/components/Issue/DropAnIssueComponent";
import RootLayout from "@/layout/RootLayout";

const DropAnIssue = () => {
  return (
    <>
      <DropAnIssueComponent />
    </>
  );
};

export default DropAnIssue;

DropAnIssue.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
