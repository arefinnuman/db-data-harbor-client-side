import dbDataHarborLogo from "@/assets/DB-Data-Harbor.png";
import {
  useDeleteIssueFormMutation,
  useGetAllIssueFormQuery,
  useUpdateIssueToPendingMutation,
  useUpdateIssueToResolveMutation,
  useUpdateToInProgressMutation,
} from "@/redux/issueForm/issueFormApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "../Ui/DeleteConfirmationModal";
import LoadingScreen from "../Ui/LoadingScreen";

const IssueFormComponent = () => {
  const {
    data: allIssues,
    isLoading,
    refetch,
  } = useGetAllIssueFormQuery(undefined, {
    pollingInterval: 9000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const issueFormData = allIssues?.data;

  const [solvedIssue] = useUpdateIssueToResolveMutation();
  const [pendingIssue] = useUpdateIssueToPendingMutation();
  const [inprogressIssue] = useUpdateToInProgressMutation();

  const handleToResolve = async (id) => {
    try {
      const response = await solvedIssue(id);
      toast.success(response?.data?.message);
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleToPending = async (id) => {
    try {
      const response = await pendingIssue(id);
      toast.success(response?.data?.message);
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleToInprogress = async (id) => {
    try {
      const response = await inprogressIssue(id);
      toast.success(response?.data?.message);
      refetch();
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
        <ul className="list-disc pl-5 space-y-1">
          {existingProblems.map((problem) => (
            <li key={problem} className="text-gray-700 text-sm font-medium">
              {issueForm[problem]}
            </li>
          ))}
        </ul>
        {existingProblems.length === problemKeys.length && (
          <div className="text-red-500 text-sm font-bold mt-2">
            All problems are present.
          </div>
        )}
      </td>
    );
  }

  const user = useSelector((state) => state?.auth?.user?.user);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState(null);

  const [deleteIssue] = useDeleteIssueFormMutation(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const handleDeleteIssue = async () => {
    try {
      await deleteIssue(issueToDelete);
      toast.success("issue deleted successfully");
      refetch();
      refetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = (issueId) => {
    if (issueId) {
      setIssueToDelete(issueId);
      setShowDeleteConfirmation(true);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <section>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <section className="px-6">
            <div className="flex justify-between items-center my-2">
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
                    Issue Forms
                  </h2>
                </div>
              )}

              {user?.role === "admin" ||
                (user?.role === "super_admin" && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-600">
                      Issue Form
                    </h2>
                  </div>
                ))}

              <div>
                <Image
                  src={dbDataHarborLogo}
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>
            </div>

            <div>
              <div className="w-full max-w-6xl m-auto overflow-x-auto shadow-md rounded-xl">
                <table className="w-full bg-white border">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      {[
                        "Name",
                        "Address",
                        "Problems",
                        "Submitted Date",
                        "Status",
                        "Mark as",
                        "Details",
                        "Delete",
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
                    {issueFormData?.map((issue, index) => (
                      <tr
                        key={issue.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } hover:bg-blue-50 transition duration-150`}
                      >
                        <td className="py-2 px-4">
                          {issue.boothManagement?.ebl365.ebl365Name}
                        </td>
                        <td className="py-2 px-4">
                          {issue.boothManagement?.ebl365.ebl365Address}
                        </td>
                        <BoothProblems issueForm={issue} />
                        <td className="py-2 px-4">
                          {issue.issueSubmittedDate
                            ? new Date(
                                issue.issueSubmittedDate
                              ).toLocaleDateString()
                            : ""}
                        </td>
                        <td className="py-2 px-4">
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                              issue.issueStatus.toLowerCase() === "pending"
                                ? "bg-red-100 text-red-800"
                                : issue.issueStatus.toLowerCase() ===
                                  "in progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : issue.issueStatus.toLowerCase() === "resolved"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {issue.issueStatus}
                          </div>
                        </td>

                        <td className="py-2 px-4">
                          {issue.issueStatus.toLowerCase() === "pending" ? (
                            <>
                              <button
                                className="text-blue-500 hover:border-blue-600 rounded px-3 py-1 mr-2 cursor-pointer hover:bg-blue-500 hover:text-white transition ease-in-out duration-300"
                                onClick={() => handleToResolve(issue.id)}
                              >
                                Resolve
                              </button>
                              <button
                                className="text-yellow-500 hover:border-yellow-600 rounded px-3 py-1 cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out duration-300"
                                onClick={() => handleToInprogress(issue.id)}
                              >
                                In Progress
                              </button>
                            </>
                          ) : issue.issueStatus.toLowerCase() === "resolved" ? (
                            <>
                              <button
                                className="text-green-500 hover:border-green-600 rounded px-3 py-1 cursor-pointer hover:bg-green-500 hover:text-white transition ease-in-out duration-300"
                                onClick={() => handleToPending(issue.id)}
                              >
                                Pending
                              </button>
                              <button
                                className="text-yellow-500 hover:border-yellow-600 rounded px-3 py-1 cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out duration-300"
                                onClick={() => handleToInprogress(issue.id)}
                              >
                                In Progress
                              </button>
                            </>
                          ) : issue.issueStatus.toLowerCase() ===
                            "in progress" ? (
                            <>
                              <button
                                className="text-yellow-500 hover:border-yellow-600 rounded px-3 py-1 cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out duration-300"
                                onClick={() => handleToPending(issue.id)}
                              >
                                Pending
                              </button>
                              <button
                                className="text-blue-500 hover:border-blue-600 rounded px-3 py-1 mr-2 cursor-pointer hover:bg-blue-500 hover:text-white transition ease-in-out duration-300"
                                onClick={() => handleToResolve(issue.id)}
                              >
                                Resolve
                              </button>
                            </>
                          ) : (
                            <button
                              className="text-gray-500 hover:border-gray-600 rounded px-3 py-1 cursor-pointer hover:bg-gray-500 hover:text-white transition ease-in-out duration-300"
                              disabled
                            >
                              Status Unavailable
                            </button>
                          )}
                        </td>

                        <td className="py-2 px-4">
                          <Link
                            href={`/issue-form/${issue.id}`}
                            className="flex items-center text-gray-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
                          >
                            <span className="mr-2 border-b border-transparent hover:border-black hover:shadow-md">
                              Details
                            </span>
                          </Link>
                        </td>

                        {(user?.role === "admin" ||
                          user?.role === "super_admin") && (
                          <td className="py-2 px-4 flex space-x-2 items-center justify-center">
                            <button
                              onClick={() => handleDeleteButtonClick(issue._id)}
                              className="flex items-center text-red-500 hover:bg-red-100 p-2 rounded transition-all duration-300 transform hover:scale-105"
                            >
                              <span className="mr-2 border-b border-transparent hover:border-red-500 hover:shadow-md">
                                Delete
                              </span>
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {showDeleteConfirmation && (
              <DeleteConfirmationModal
                onConfirm={() => {
                  handleDeleteIssue(issueToDelete);
                  setShowDeleteConfirmation(false);
                }}
                onCancel={() => setShowDeleteConfirmation(false)}
              />
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default IssueFormComponent;
