import { useGetSingleIssueFormQuery } from "@/redux/issueForm/issueFormApi";
import { useRouter } from "next/router";
import LoadingScreen from "../Ui/LoadingScreen";

const SingleIssueFormComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetSingleIssueFormQuery(id, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const issueData = data?.data || {};
  console.log("issueData", issueData);

  if (isLoading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  return (
    <div style={{ margin: "20px" }}>
      <h1>Issue Details</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2>General Information</h2>
        <p>
          <strong>ID:</strong> {issueData._id}
        </p>
        <p>
          <strong>Status:</strong> {issueData.issueStatus}
        </p>
        <p>
          <strong>Submitted Date:</strong> {issueData.issueSubmittedDate}
        </p>
        <p>
          <strong>Updated At:</strong> {issueData.updatedAt}
        </p>
        <p>
          <strong>Created By:</strong> {issueData.createdBy?.fullName.firstName}{" "}
          {issueData.createdBy?.fullName.lastName}
        </p>
        <p>
          <strong>Department:</strong> {issueData.createdBy?.department}
        </p>

        <h2>Booth Management Details</h2>
        <p>
          <strong>Booth ID:</strong> {issueData.boothManagement?._id}
        </p>
        <p>
          <strong>Number of Machines:</strong>{" "}
          {issueData.boothManagement?.numberOfMachine}
        </p>

        <h2>Issues Reported</h2>
        <p>
          <strong>AC Problem:</strong> {issueData.acProblem || "No"}
        </p>
        <p>
          <strong>Light Problem:</strong> {issueData.lightProblem || "No"}
        </p>
      </div>
    </div>
  );
};

export default SingleIssueFormComponent;
