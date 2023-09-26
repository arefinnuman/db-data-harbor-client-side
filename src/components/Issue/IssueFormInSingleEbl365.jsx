import { useGetIssuesByEbl365Query } from "@/redux/issueForm/issueFormApi";

const IssueFormInSingleEbl365Component = ({ id }) => {
  const { data: issueData } = useGetIssuesByEbl365Query(id, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const issues = issueData?.data || [];

  return (
    <div>
      {issues.map((issue, index) => (
        <div key={index} className="my-6">
          <h2 className="text-xl mb-2 text-primary">Issue {index + 1}</h2>

          <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
            <table className="min-w-full">
              <tbody className="text-gray-900">
                {[
                  ["Machine", "machineProblem"],
                  ["AC", "acProblem"],
                  ["Light", "lightProblem"],
                  ["Mineral Board", "mineralBoardProblem"],
                  ["Roof Ceiling", "roofCellingProblem"],
                  ["Wall", "wallProblem"],
                  ["Aico", "aicoProblem"],
                  ["Tiles", "tilesProblem"],
                  ["Wastage Bin", "wastageBinProblem"],
                  ["DVR", "dvrProblem"],
                  ["UPS", "upsProblem"],
                  ["Others", "othersProblem"],
                ].map(([label, key]) =>
                  issue[key] ? (
                    <tr className="hover:bg-gray-100" key={key}>
                      <td className="p-3">{label} Problem</td>
                      <td className="p-3">{issue[key]}</td>
                    </tr>
                  ) : null
                )}

                <tr className="hover:bg-gray-100">
                  <td className="p-3">Submitted Date</td>
                  <td className="p-3">{issue.issueSubmittedDate}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3">Submitted By</td>
                  <td className="p-3">{issue.createdBy?.email}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3">Issue Status</td>
                  <td className="p-3">{issue.issueStatus}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center my-3">
              <button className="text-primary underline">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueFormInSingleEbl365Component;
