import dbDataHarborLogo from "@/assets/DB-Data-Harbor.png";
import {
  useDeleteBoothAcquisitionMutation,
  useGetAllBoothAcquisitionQuery,
  useGetUnassignedBoothForAcquisitionQuery,
} from "@/redux/boothAcquisition/boothAcquisitionApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaDownload, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "../Ui/DeleteConfirmationModal";
import LoadingScreen from "../Ui/LoadingScreen";
import UpdateBoothAcquisitionForm from "./UpdateBoothAcquistionForm";

const BoothAcquisitionComponent = () => {
  const {
    data: boothAcquisitionAllData,
    isLoading,
    refetch,
  } = useGetAllBoothAcquisitionQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const boothAcquisitionData = boothAcquisitionAllData?.data;

  function DownloadLink({ url }) {
    return (
      <a
        href={url}
        className="text-sm hover:text-blue-500 flex items-center space-x-2 transition-colors duration-300 transform hover:scale-105"
      >
        <FaDownload size={20} />
        <span>Download</span>
      </a>
    );
  }

  const user = useSelector((state) => state.auth.user?.user);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [boothAcquisitionToDelete, setBoothAcquisitionToDelete] =
    useState(null);

  const [selectedUpdateBoothAcquisition, setSelectedUpdateBoothAcquisition] =
    useState(null);

  const [delete365boothAcquisition] = useDeleteBoothAcquisitionMutation(
    undefined,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleDelete365boothAcquisition = async () => {
    try {
      await delete365boothAcquisition(boothAcquisitionToDelete);
      toast.success("boothAcquisition deleted successfully");
      refetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = (boothAcquisitionId) => {
    setBoothAcquisitionToDelete(boothAcquisitionId);
    setShowDeleteConfirmation(true);
  };

  const { data: unAssignedEbl365 } = useGetUnassignedBoothForAcquisitionQuery(
    undefined,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

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

  // landOwnerName: 'John Doe',
  //     landOwnerAddress: '123 Elm Street, Springfield',
  //     landOwnerPhone: '+1-123-456-7890',
  //     boothLocation: 'East Wing, Springfield Mall etc a1',
  //     boothType: 'Food Stall',
  //     boothStartDate: '2021-10-01T00:00:00.000Z',
  //     boothExpiryDate: '2027-10-01T00:00:00.000Z',
  //     boothContractYear: 6,
  //     boothContractMonth: 72,
  //     boothMonthlyRent: 24000,
  //     boothSize: 100,
  //     boothPerSqftRent: 240,
  //     totalBoothRent: 1728000,
  //     advancePaymentPercentage: 20,
  //     totalAdvancePayment: 345600,
  //     monthlyAdvancePayment: 5760,
  //     monthlyRentAfterAdvancePayment: 18240,
  //     monthlyRentAfterThreeYears: 20976,
  //     monthlyRentAfterFiveYears: 26736,
  //     currentMonthlyRent: 18240,

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
                  href="/booth-acquisition/create"
                  className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
                >
                  <FaPlus className="mr-2" /> Create
                </Link>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  BOOTH ACQUISITION
                </h2>
              </div>
            )}

            {user?.role === "admin" ||
              (user?.role === "super_admin" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-600">
                    BOOTH ACQUISITION
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

          <div className="w-full max-w-7xl m-auto overflow-x-auto shadow-md rounded-xl">
            <table className="w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  {[
                    "Name",
                    "Address",
                    "Owner Name",
                    "Adv. Payment %",
                    "Contract Year",
                    "Booth Start Date",
                    "Booth Expiry Date",
                    "Monthly Rent",
                    "Size",
                    "Total Rent",
                    "Current Monthly Rent",
                    "Type",
                    "Board Memo",
                    "Agreement Paper",
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
                {boothAcquisitionData?.map((boothAcquisition, index) => (
                  <tr
                    key={boothAcquisition._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-white"
                    } hover:bg-blue-50 transition duration-150`}
                  >
                    <td className="py-2 px-4">
                      {boothAcquisition.ebl365.ebl365Name}
                    </td>
                    <td className="py-2 px-4">
                      {boothAcquisition.ebl365.ebl365Address}
                    </td>
                    <td className="py-2 px-4">
                      {boothAcquisition.landOwnerName}
                    </td>
                    <td className="py-2 px-4">
                      {boothAcquisition.advancePaymentPercentage}
                    </td>
                    <td className="py-2 px-4">
                      {boothAcquisition.boothContractYear}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(
                        boothAcquisition.boothStartDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(
                        boothAcquisition.boothExpiryDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {boothAcquisition.boothMonthlyRent}
                    </td>
                    <td className="py-2 px-4">{boothAcquisition.boothSize}</td>
                    <td className="py-2 px-4">
                      {boothAcquisition.totalBoothRent}
                    </td>
                    <td className="py-2 px-4">
                      {boothAcquisition.currentMonthlyRent}
                    </td>
                    <td className="py-2 px-4">{boothAcquisition.boothType}</td>

                    <td className="py-2 px-4">
                      <div className="p-4">
                        <DownloadLink
                          url={`http://localhost:5555/${boothAcquisition.agreementBetweenEblAndBoothOwner}`}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="p-4">
                        <DownloadLink
                          url={`http://localhost:5555/${boothAcquisition.agreementBetweenEblAndBoothOwner}`}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        href={`/booth-acquisition/${boothAcquisition._id}`}
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
                          onClick={() => {
                            setSelectedUpdateBoothAcquisition(boothAcquisition);
                          }}
                          className="flex items-center text-blue-500 hover:bg-blue-100 p-2 rounded transition-all duration-300 transform hover:scale-105"
                        >
                          <span className="mr-2 border-b border-transparent hover:border-blue-500 hover:shadow-md">
                            Edit
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteButtonClick(boothAcquisition._id)
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

          {selectedUpdateBoothAcquisition && (
            <dialog
              id="my_modal_2"
              className="modal modal-bottom sm:modal-middle "
              open
            >
              <section
                method="dialog"
                className="modal-box border border-primary shadow-2xl"
              >
                <UpdateBoothAcquisitionForm
                  selectedUpdateBoothAcquisition={
                    selectedUpdateBoothAcquisition
                  }
                />
                <div className="modal-action text-center flex justify-center">
                  <button
                    className="btn btn-sm btn-outline "
                    onClick={() => setSelectedUpdateBoothAcquisition(null)}
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
                handleDelete365boothAcquisition(boothAcquisitionToDelete);
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

export default BoothAcquisitionComponent;
