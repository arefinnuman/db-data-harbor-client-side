import DropIssueByAdmin from "@/components/Issue/DropIssueByAdmin";
import RootLayout from "@/layout/RootLayout";

const DropAllIssues = () => {
  return (
    <div>
      <DropIssueByAdmin />
    </div>
  );
};

export default DropAllIssues;

DropAllIssues.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
