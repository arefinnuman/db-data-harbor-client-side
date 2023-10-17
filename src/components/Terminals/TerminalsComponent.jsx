import dbDataHarborLogo from "@/assets/DB-Data-Harbor.png";
import {
  useDeleteTerminalMutation,
  useGetAllTerminalsQuery,
} from "@/redux/terminals/terminalApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "../Ui/DeleteConfirmationModal";
import LoadingScreen from "../Ui/LoadingScreen";
import UpdateTerminalForm from "./UpdateTerminalForm";

export default function TerminalsComponent() {
  const user = useSelector((state) => state.auth.user?.user);

  const { data, isLoading } = useGetAllTerminalsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const terminalsData = data?.data;

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [terminalToDelete, setTerminalToDelete] = useState(null);

  const [selectedUpdateTerminal, setSelectedUpdateTerminal] = useState(null);

  const [delete365Terminal] = useDeleteTerminalMutation(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const handleDelete365Terminal = async () => {
    try {
      await delete365Terminal(terminalToDelete);
      toast.success("Terminal deleted successfully");
      refetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = (terminalId) => {
    setTerminalToDelete(terminalId);
    setShowDeleteConfirmation(true);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="p-6">
          <div className="flex justify-between items-center my-3">
            {user?.role === "admin" || user?.role === "super_admin" ? (
              <div>
                <Link
                  href="/terminals/create"
                  className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
                >
                  <FaPlus className="mr-2" /> Create
                </Link>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  EBL 365
                </h2>
              </div>
            )}

            {user?.role === "admin" ||
              (user?.role === "super_admin" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-600">
                    TERMINALS
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

          <div className="w-max-6xl m-auto mt-4 overflow-x-auto shadow-md rounded-md">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-500 text-white">
                <tr>
                  {[
                    "Name and ID",
                    "Id",
                    "Type",
                    "Status",
                    "Brand Name",
                    "Deployment Date",
                    "Live Date",
                    "Details",
                    ...(user?.role === "admin" || user?.role === "super_admin"
                      ? ["Action"]
                      : []),
                  ].map((header) => (
                    <th
                      key={header}
                      className={`py-2 px-4 font-semibold border-b border-blue-300 ${
                        header === "Action" ? "text-center" : "text-left"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {terminalsData?.map((terminal, index) => (
                  <tr
                    key={terminal.terminalId}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition duration-150`}
                  >
                    <td className="py-2 px-4 border-t border-gray-200">
                      {terminal.terminalNameAndId}
                    </td>
                    <td className="py-2 px-4 border-t border-gray-200">
                      {terminal.terminalId}
                    </td>
                    <td className="py-2 px-4 border-t border-gray-200">
                      {terminal.terminalType}
                    </td>
                    <td className="py-2 px-4 border-t border-gray-200">
                      {terminal.terminalStatus}
                    </td>
                    <td className="py-2 px-4 border-t border-gray-200">
                      {terminal.terminalBrand}
                    </td>
                    <td className="py-2 px-4 border-t border-gray-200">
                      {terminal.deploymentDate
                        ? new Date(terminal.deploymentDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-2 px-4 border-t border-gray-200">
                      {terminal.liveDate
                        ? new Date(terminal.liveDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-2 px-4 border-t border-gray-200">
                      <Link
                        href={`/terminals/${terminal.id}`}
                        className="flex items-center text-gray-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="mr-2 border-b border-transparent hover:border-black hover:shadow-md">
                          {" "}
                          Details
                        </span>
                      </Link>
                    </td>

                    {(user?.role === "admin" ||
                      user?.role === "super_admin") && (
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          onClick={() => setSelectedUpdateTerminal(terminal)}
                          className="flex items-center text-blue-500 hover:bg-blue-100 p-2 rounded transition-all duration-300 transform hover:scale-105"
                        >
                          <span className="mr-2 border-b border-transparent hover:border-blue-500 hover:shadow-md">
                            Edit
                          </span>
                        </button>

                        <button
                          onClick={() => handleDeleteButtonClick(terminal._id)}
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

          {selectedUpdateTerminal && (
            <dialog
              id="my_modal_2"
              className="modal modal-bottom sm:modal-middle "
              open
            >
              <section
                method="dialog"
                className="modal-box border border-primary shadow-2xl"
              >
                <UpdateTerminalForm
                  selectedUpdateTerminal={selectedUpdateTerminal}
                />
                <div className="modal-action text-center flex justify-center">
                  <button
                    className="btn btn-sm btn-outline "
                    onClick={() => setSelectedUpdateTerminal(null)}
                  >
                    Close
                  </button>
                </div>
              </section>
            </dialog>
          )}

          {showDeleteConfirmation && (
            <DeleteConfirmationModal
              onConfirm={() => {
                handleDelete365Terminal(terminalToDelete);
                setShowDeleteConfirmation(false);
              }}
              onCancel={() => setShowDeleteConfirmation(false)}
            />
          )}
        </section>
      )}
    </>
  );
}
