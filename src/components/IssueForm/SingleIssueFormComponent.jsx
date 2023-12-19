import { useGetSingleIssueFormQuery } from "@/redux/issueForm/issueFormApi";
import { useRouter } from "next/router";
import { useState } from "react";
import LoadingScreen from "../Ui/LoadingScreen";

const SingleIssueFormComponent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("issues");

  const { data, isLoading } = useGetSingleIssueFormQuery(id, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const issueData = data?.data || {};

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-6">
          {activeTab === "general" && <GeneralInfo issueData={issueData} />}
          {activeTab === "booth" && (
            <BoothInfo boothData={issueData.boothManagement} />
          )}
          {activeTab === "issues" && <IssuesReported issuesData={issueData} />}
        </div>
      </div>
    </div>
  );
};

const TabBar = ({ activeTab, setActiveTab }) => (
  <div className="flex space-x-1 bg-gray-200 p-1 rounded-t-lg">
    <Tab
      title="Issues Reported"
      isActive={activeTab === "issues"}
      onClick={() => setActiveTab("issues")}
    />
    <Tab
      title="General Information"
      isActive={activeTab === "general"}
      onClick={() => setActiveTab("general")}
    />
    <Tab
      title="Booth Management"
      isActive={activeTab === "booth"}
      onClick={() => setActiveTab("booth")}
    />
  </div>
);

const Tab = ({ title, isActive, onClick }) => (
  <div
    className={`flex-1 text-center py-2 rounded-t-lg cursor-pointer ${
      isActive ? "bg-white" : "bg-gray-200 text-gray-600"
    }`}
    onClick={onClick}
  >
    {title}
  </div>
);

const GeneralInfo = ({ issueData }) => (
  <div className="space-y-3">
    <DataField label="ID" value={issueData._id} />
    <DataField label="Status" value={issueData.issueStatus} />
    <DataField label="Submitted Date" value={issueData.issueSubmittedDate} />
    <DataField label="Updated At" value={issueData.updatedAt} />
    <DataField
      label="Created By"
      value={`${issueData.createdBy?.fullName.firstName} ${issueData.createdBy?.fullName.lastName}`}
    />
    <DataField label="Department" value={issueData.createdBy?.department} />
  </div>
);

const BoothInfo = ({ boothData }) => (
  <div className="space-y-3">
    <DataField label="Booth ID" value={boothData?._id} />
    <DataField
      label="Number of Machines"
      value={boothData?.ebl365?.noOfAvailableMachine}
    />
    <DataField label="Booth Name" value={boothData?.ebl365?.ebl365Name} />
    <DataField label="Booth Address" value={boothData?.ebl365?.ebl365Address} />
    <DataField label="Booth Owner" value={boothData?.ebl365?.boothDevices} />
  </div>
);
const IssuesReported = ({ issuesData }) => (
  <div className="space-y-3">
    <DataField label="AC Problem" value={issuesData.acProblem || "No"} />
    <DataField label="Light Problem" value={issuesData.aicoProblem || "No"} />
    <DataField
      label="Issue Description"
      value={issuesData.dvrProblem || "No"}
    />
    <DataField label="Fan Problem" value={issuesData.fanProblem || "No"} />
    <DataField label="Light Problem" value={issuesData.lightProblem || "No"} />
    <DataField
      label="Machine Problem"
      value={issuesData.machineProblem || "No"}
    />
    <DataField
      label="Mineral Board Problem"
      value={issuesData.mineralBoardProblem || "No"}
    />
    <DataField
      label="Others Problem"
      value={issuesData.othersProblem || "No"}
    />
    <DataField
      label="Roof Ceiling Problem"
      value={issuesData.roofCeilingProblem || "No"}
    />
    <DataField label="Tiles Problem" value={issuesData.tilesProblem || "No"} />
    <DataField label="UPS Problem" value={issuesData.upsProblem || "No"} />
    <DataField label="Wall Problem" value={issuesData.wallProblem || "No"} />
  </div>
);

const DataField = ({ label, value }) => (
  <div className="flex">
    <div className="font-medium w-1/3">{label}:</div>
    <div className="w-2/3">{value}</div>
  </div>
);

export default SingleIssueFormComponent;
