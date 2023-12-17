import dbDataHarborLogo from "@/assets/DB-Data-Harbor.png";
import {
  useGetPendingIssuesQuery,
  useGetResolvedIssuesQuery,
  useUpdateIssueToPendingMutation,
  useUpdateIssueToResolveMutation,
} from "@/redux/issueForm/issueFormApi";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import LoadingScreen from "../Ui/LoadingScreen";

const IssueFormComponent = () => {
  const {
    data: pendingIssues,
    isLoading: isLoadingPending,
    refetch: refetchPending,
  } = useGetPendingIssuesQuery(undefined, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const {
    data: resolvedIssues,
    isLoading: isLoadingResolved,
    refetch: refetchResolved,
  } = useGetResolvedIssuesQuery(undefined, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const pendingIssueFormData = pendingIssues?.data;
  const resolvedIssuesFormData = resolvedIssues?.data;

  const [solvedIssue] = useUpdateIssueToResolveMutation();
  const [pendingIssue] = useUpdateIssueToPendingMutation();

  const handleToResolve = async (id) => {
    try {
      const response = await solvedIssue(id);
      toast.success(response?.data?.message);
      refetchPending();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleToPending = async (id) => {
    try {
      const response = await pendingIssue(id);
      toast.success(response?.data?.message);
      refetchResolved();
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
  const user = useSelector((state) => state?.auth?.user?.user);

  return (
    <div>
      <section className="p-6">
        {isLoadingPending ? (
          <LoadingScreen />
        ) : (
          <section>
            <div className="flex justify-between items-center my-3">
              {user?.role === "admin" || user?.role === "super_admin" ? (
                <div>
                  <Link
                    href="/issue-form/drop-an-issue"
                    className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
                  >
                    <FaPlus className="mr-2" /> Create
                  </Link>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-600">
                    Issues
                  </h2>
                </div>
              )}

              <div>
                <Image
                  src={dbDataHarborLogo}
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>
            </div>

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
                            className="py-3 px-4 text-left font-semibold border-b border-blue-300"
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
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
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
                              className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-3 py-1 transform transition-transform hover:scale-105 focus:outline-none"
                              onClick={() =>
                                handleToResolve(pendingIssueForm.id)
                              }
                            >
                              Resolved
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
                            className="py-3 px-4 text-left font-semibold border-b border-blue-300"
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
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
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
                              <button
                                className="btn btn-primary bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-3 py-1 transform transition-transform hover:scale-105 focus:outline-none"
                                onClick={() =>
                                  handleToPending(resolvedIssuesForm.id)
                                }
                              >
                                Reopen
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
          </section>
        )}
      </section>
    </div>
  );
};

export default IssueFormComponent;
