import {
  useGetPendingIssuesQuery,
  useGetResolvedIssuesQuery,
  useUpdateIssueToResolveMutation,
} from "@/redux/issueForm/issueFormApi";
import toast from "react-hot-toast";
import LoadingScreen from "../Ui/LoadingScreen";

const IssueFormComponent = () => {
  const {
    data: pendingIssues,
    isLoading: isLoadingPending,
    refetch: refetchPending,
  } = useGetPendingIssuesQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const {
    data: resolvedIssues,
    isLoading: isLoadingResolved,
    refetch: refetchResolved,
  } = useGetResolvedIssuesQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const pendingIssueFormData = pendingIssues?.data;
  const resolvedIssuesFormData = resolvedIssues?.data;

  const [solvedIssue] = useUpdateIssueToResolveMutation();

  const handleSolvedIssue = async (id) => {
    try {
      const response = await solvedIssue(id);
      toast.success(response?.data?.message);
      refetchPending();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  function BoothProblems({ issueForm }) {
    const problemKeys = [
      "acProblem",
      "machineProblem",
      "lightProblem",
      "roofCeilingProblem",
      "wallProblem",
      "aicoProblem",
      "mineralBoardProblem",
      "tilesProblem",
      "wastageBinProblem",
      "dvrProblem",
      "upsProblem",
      "othersProblem",
    ];

    const existingProblems = problemKeys.filter((key) => issueForm[key]);

    return (
      <td className="py-2 px-4">
        {existingProblems.map((problem) => (
          <div key={problem}>* {issueForm[problem]}</div>
        ))}
        {existingProblems.length === problemKeys.length && (
          <div>All problems are present.</div>
        )}
      </td>
    );
  }

  return (
    <div>
      <section className="p-6">
        {isLoadingPending ? (
          <LoadingScreen />
        ) : (
          <div>
            {pendingIssueFormData?.length > 0 && (
              <div>
                <h1 className="text-2xl text-center font-semibold mb-4">
                  Pending Issues
                </h1>

                <div className="w-full max-w-6xl m-auto overflow-x-auto shadow-md rounded-xl">
                  <table className="w-full bg-white border">
                    <thead className="bg-blue-500 text-white">
                      <tr>
                        {[
                          "Name",
                          "Address",
                          "Problem",
                          "Submitted Date",
                          "Status",
                          "Action",
                        ].map((header) => (
                          <th
                            key={header}
                            className="py-2 px-4 text-left font-semibold border-b border-blue-300"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pendingIssueFormData?.map((pendingIssueForm, index) => (
                        <tr
                          key={pendingIssueForm.id}
                          className={`${
                            index % 2 === 0 ? "bg-white" : "bg-white"
                          } hover:bg-blue-50 transition duration-150`}
                        >
                          <td className="py-2 px-4">
                            {
                              pendingIssueForm.boothManagement?.ebl365
                                .ebl365Name
                            }
                          </td>
                          <td className="py-2 px-4">
                            {
                              pendingIssueForm.boothManagement?.ebl365
                                .ebl365Address
                            }
                          </td>
                          <BoothProblems issueForm={pendingIssueForm} />
                          <td className="py-2 px-4">
                            {pendingIssueForm.issueSubmittedDate
                              ? new Date(
                                  pendingIssueForm.issueSubmittedDate
                                ).toLocaleDateString()
                              : ""}
                          </td>
                          <td className="py-2 px-4">
                            {pendingIssueForm.issueStatus}
                          </td>
                          <td className="py-2 px-4">
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                handleSolvedIssue(pendingIssueForm.id)
                              }
                            >
                              Mark as Resolved
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {resolvedIssuesFormData?.length > 0 && (
              <div>
                <h1 className="text-2xl text-center font-semibold my-4">
                  Resolved Issues
                </h1>

                <div className="w-full max-w-6xl m-auto overflow-x-auto shadow-md rounded-xl">
                  <table className="w-full bg-white border">
                    <thead className="bg-blue-500 text-white">
                      <tr>
                        {[
                          "Name",
                          "Address",
                          "Problem",
                          "Submitted Date",
                          "Status",
                          "Action",
                        ].map((header) => (
                          <th
                            key={header}
                            className="py-2 px-4 text-left font-semibold border-b border-blue-300"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {resolvedIssuesFormData?.map(
                        (resolvedIssuesForm, index) => (
                          <tr
                            key={resolvedIssuesForm.id}
                            className={`${
                              index % 2 === 0 ? "bg-white" : "bg-white"
                            } hover:bg-blue-50 transition duration-150`}
                          >
                            <td className="py-2 px-4">
                              {
                                resolvedIssuesForm.boothManagement?.ebl365
                                  .ebl365Name
                              }
                            </td>
                            <td className="py-2 px-4">
                              {
                                resolvedIssuesForm.boothManagement?.ebl365
                                  .ebl365Address
                              }
                            </td>
                            <BoothProblems issueForm={resolvedIssuesForm} />
                            <td className="py-2 px-4">
                              {resolvedIssuesForm.issueSubmittedDate
                                ? new Date(
                                    resolvedIssuesForm.issueSubmittedDate
                                  ).toLocaleDateString()
                                : ""}
                            </td>
                            <td className="py-2 px-4">
                              {resolvedIssuesForm.issueStatus}
                            </td>
                            <td className="py-2 px-4">
                              <button className="btn btn-primary">
                                Resolved
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default IssueFormComponent;
