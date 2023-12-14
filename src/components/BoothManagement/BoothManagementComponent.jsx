import dbDataHarborLogo from "@/assets/DB-Data-Harbor.png";
import {
  useDeleteBoothManagementMutation,
  useGetAllBoothManagementQuery,
  useGetUnassignedBoothQuery,
} from "@/redux/boothManagement/bothManagementApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "../Ui/DeleteConfirmationModal";
import LoadingScreen from "../Ui/LoadingScreen";
import UpdateBoothManagementForm from "./UpdateBoothManagementForm";

const BoothManagementComponent = () => {
  const {
    data: boothData,
    isLoading,
    refetch,
  } = useGetAllBoothManagementQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const boothManagementData = boothData?.data;

  const user = useSelector((state) => state?.auth?.user?.user);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [boothManagementToDelete, setBoothManagementToDelete] = useState(null);

  const [selectedUpdateBoothManagement, setSelectedUpdateBoothManagement] =
    useState(null);

  const [delete365boothManagement] = useDeleteBoothManagementMutation(
    undefined,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleDelete365boothManagement = async () => {
    try {
      await delete365boothManagement(boothManagementToDelete);
      toast.success("boothManagement deleted successfully");
      refetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = (boothManagementId) => {
    setBoothManagementToDelete(boothManagementId);
    setShowDeleteConfirmation(true);
  };

  const { data: unAssignedEbl365 } = useGetUnassignedBoothQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const unAssignedEbl365Data = unAssignedEbl365?.data;

  const hasUnassignedBooths =
    unAssignedEbl365Data && unAssignedEbl365Data.length > 0;

  const renderUnassignedBooths = () => {
    return unAssignedEbl365Data.map((booth, index) => (
      <li key={booth.id}>
        {booth.ebl365Name}
        {index < unAssignedEbl365Data.length - 1 ? "" : ""}
      </li>
    ));
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
                  href="/booth-management/create"
                  className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
                >
                  <FaPlus className="mr-2" /> Create
                </Link>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  MANAGE ALL THE BOOTH
                </h2>
              </div>
            )}

            {user?.role === "admin" ||
              (user?.role === "super_admin" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-600">
                    MANAGE ALL THE BOOTH
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

          <div className="w-full max-w-6xl m-auto overflow-x-auto shadow-md rounded-xl">
            <table className="w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  {[
                    "Name",
                    "Address",
                    "AC Quantity",
                    "Light Quantity",
                    "Machine Quantity",
                    "Mineral Quantity",
                    "UPS Quantity",
                    "Details",
                    "Complain",
                    ...(user?.role === "admin" || user?.role === "super_admin"
                      ? ["Action"]
                      : []),
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
                {boothManagementData?.map((boothManagement, index) => (
                  <tr
                    key={boothManagement.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-white"
                    } hover:bg-blue-50 transition duration-150`}
                  >
                    <td className="py-2 px-4">
                      {boothManagement.ebl365.ebl365Name}
                    </td>
                    <td className="py-2 px-4">
                      {boothManagement.ebl365.ebl365Address}
                    </td>
                    <td className="py-2 px-4">{boothManagement.numberOfAc}</td>
                    <td className="py-2 px-4">
                      {boothManagement.numberOfLight}
                    </td>
                    <td className="py-2 px-4">
                      {boothManagement.numberOfMachine}
                    </td>
                    <td className="py-2 px-4">
                      {boothManagement.numberOfMineralBoard}
                    </td>
                    <td className="py-2 px-4">{boothManagement.numberOfUps}</td>

                    <td className="py-2 px-4">
                      <Link
                        href={`/booth-management/${boothManagement._id}`}
                        className="flex items-center text-gray-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="mr-2 border-b border-transparent hover:border-black hover:shadow-md">
                          Details
                        </span>
                      </Link>
                    </td>
                    <td className="py-2 px-4 ">
                      <Link
                        href={`/issue-form/drop-an-issue/${boothManagement.ebl365._id}`}
                        className="flex items-center text-gray-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="mr-2 border-b border-transparent hover:border-black hover:shadow-md">
                          Drop
                        </span>
                      </Link>
                    </td>
                    {(user?.role === "admin" ||
                      user?.role === "super_admin") && (
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          onClick={() =>
                            setSelectedUpdateBoothManagement(boothManagement)
                          }
                          className="flex items-center text-blue-500 hover:bg-blue-100 p-2 rounded transition-all duration-300 transform hover:scale-105"
                        >
                          <span className="mr-2 border-b border-transparent hover:border-blue-500 hover:shadow-md">
                            Edit
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteButtonClick(boothManagement._id)
                          }
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

          {selectedUpdateBoothManagement && (
            <dialog
              id="my_modal_2"
              className="modal modal-bottom sm:modal-middle "
              open
            >
              <section
                method="dialog"
                className="modal-box border border-primary shadow-2xl"
              >
                <UpdateBoothManagementForm
                  selectedUpdateBoothManagement={selectedUpdateBoothManagement}
                />
                <div className="modal-action text-center flex justify-center">
                  <button
                    className="btn btn-sm btn-outline "
                    onClick={() => setSelectedUpdateBoothManagement(null)}
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
                handleDelete365boothManagement(boothManagementToDelete);
                setShowDeleteConfirmation(false);
              }}
              onCancel={() => setShowDeleteConfirmation(false)}
            />
          )}

          {hasUnassignedBooths && (
            <div className="mt-5">
              <div className="p-4 mb-4 rounded-lg bg-yellow-100 border-yellow-400 border-l-4">
                <h5 className="text-yellow-800 text-lg font-semibold mb-2">
                  Attention: Unassigned Booths
                </h5>
                <p className="text-yellow-700 mb-3">
                  The following booths are currently unassigned. Please assign
                  them soon:
                </p>
                <ul className="list-disc list-inside pl-5">
                  {renderUnassignedBooths()}
                </ul>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default BoothManagementComponent;
