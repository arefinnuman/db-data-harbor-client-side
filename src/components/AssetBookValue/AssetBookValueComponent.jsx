import dbDataHarborLogo from "@/assets/DB-Data-Harbor.png";
import {
  useDeleteAssetBookValueMutation,
  useGetAllAssetBookValueQuery,
  useGetUnAssignedTerminalsInAssetBookValueQuery,
} from "@/redux/assetBookValue/assetBookValueApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "../Ui/DeleteConfirmationModal";
import LoadingScreen from "../Ui/LoadingScreen";
import UpdateAssetBookValueForm from "./UpdateAssetBookValueForm";

const AssetBookValueComponent = () => {
  const {
    data: assetBookValue,
    isLoading,
    refetch,
  } = useGetAllAssetBookValueQuery();
  const assetBookValueData = assetBookValue?.data;

  const user = useSelector((state) => state.auth.user?.user);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [assetBookValueToDelete, setAssetBookValueToDelete] = useState(null);

  const [selectedUpdateAssetBookValue, setSelectedUpdateAssetBookValue] =
    useState(null);

  const [delete365assetBookValue] = useDeleteAssetBookValueMutation(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const handleDelete365assetBookValue = async () => {
    try {
      await delete365assetBookValue(assetBookValueToDelete);
      toast.success("assetBookValue deleted successfully");
      refetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = (assetBookValueId) => {
    setAssetBookValueToDelete(assetBookValueId);
    setShowDeleteConfirmation(true);
  };

  const { data: unAssignedTerminals } =
    useGetUnAssignedTerminalsInAssetBookValueQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedTerminalsData = unAssignedTerminals?.data;

  const hasUnassignedBooths =
    unAssignedTerminalsData && unAssignedTerminalsData.length > 0;

  const renderUnassignedBooths = () => {
    return unAssignedTerminalsData.map((booth, index) => (
      <li key={booth.id}>
        {booth.ebl365Name}
        {index < unAssignedTerminalsData.length - 1 ? "" : ""}
      </li>
    ));
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="px-6">
          <div className="flex justify-between items-center my-2">
            {user?.role === "admin" || user?.role === "super_admin" ? (
              <div>
                <Link
                  href="/asset-book-value/create"
                  className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
                >
                  <FaPlus className="mr-2" /> Create
                </Link>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  Asset Book Value
                </h2>
              </div>
            )}

            {user?.role === "admin" ||
              (user?.role === "super_admin" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-600">
                    Asset Book Value
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
                    "Terminal",
                    "Amc Value",
                    "Pro. Year",
                    "Purchase Price",
                    "Purchase Date",
                    "First Deployment Date",
                    "Age",
                    "Purchase Mood",
                    "Details",
                    ...(user?.role === "admin" || user?.role === "super_admin"
                      ? ["Action"]
                      : []),
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-2 px-4 font-semibold border-b border-blue-300 text-center"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assetBookValueData?.map((assetBookValue, index) => (
                  <tr
                    key={assetBookValue.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-white"
                    } hover:bg-blue-50 transition duration-150`}
                  >
                    <td className="py-2 px-4">
                      {assetBookValue.terminal.terminalNameAndId}
                    </td>
                    <td className="py-2 px-4">
                      {assetBookValue.assetAmcAmount}
                    </td>
                    <td className="py-2 px-4">
                      {assetBookValue.procurementYear}
                    </td>

                    <td className="py-2 px-4">
                      {assetBookValue.purchasePrice}
                    </td>

                    <td className="py-2 px-4">
                      {new Date(
                        assetBookValue.dateOfPurchase
                      ).toLocaleDateString()}
                    </td>

                    <td className="py-2 px-4">
                      {new Date(
                        assetBookValue.firstDeploymentDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="py-2 px-4">{assetBookValue.machineAge}</td>

                    <td className="py-2 px-4">{assetBookValue.purchaseMood}</td>

                    <td className="py-2 px-4">
                      <Link
                        href={`/booth-management/${assetBookValue._id}`}
                        className="flex items-center text-gray-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="mr-2 border-b border-transparent hover:border-black hover:shadow-md">
                          Details
                        </span>
                      </Link>
                    </td>

                    {(user?.role === "admin" ||
                      user?.role === "super_admin") && (
                      <td className="py-2 px-4 flex space-x-2">
                        <button
                          onClick={() =>
                            setSelectedUpdateAssetBookValue(assetBookValue)
                          }
                          className="flex items-center text-blue-500 hover:bg-blue-100 p-2 rounded transition-all duration-300 transform hover:scale-105"
                        >
                          <span className="mr-2 border-b border-transparent hover:border-blue-500 hover:shadow-md">
                            Edit
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteButtonClick(assetBookValue._id)
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

          {selectedUpdateAssetBookValue && (
            <dialog
              id="my_modal_2"
              className="modal modal-bottom sm:modal-middle "
              open
            >
              <section
                method="dialog"
                className="modal-box border border-primary shadow-2xl"
              >
                <UpdateAssetBookValueForm
                  selectedUpdateAssetBookValue={selectedUpdateAssetBookValue}
                />
                <div className="modal-action text-center flex justify-center">
                  <button
                    className="btn btn-sm btn-outline "
                    onClick={() => setSelectedUpdateAssetBookValue(null)}
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
                handleDelete365assetBookValue(assetBookValueToDelete);
                setShowDeleteConfirmation(false);
              }}
              onCancel={() => setShowDeleteConfirmation(false)}
            />
          )}

          {/* {hasUnassignedBooths && (
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
          )} */}
        </section>
      )}
    </>
  );
};

export default AssetBookValueComponent;
