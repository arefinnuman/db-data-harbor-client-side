import dbDataHarborLogo from "@/assets/DB-Data-Harbor.png";
import {
  useDeleteEbl365Mutation,
  useGetAllEbl365Query,
} from "@/redux/ebl365/ebl365Api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteConfirmationModal from "../Ui/DeleteConfirmationModal";
import LoadingScreen from "../Ui/LoadingScreen";
import Update365Form from "./Update365Form";

export default function Ebl365Components() {
  const user = useSelector((state) => state.auth.user?.user);

  const { data, isLoading, refetch } = useGetAllEbl365Query(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const ebl365Data = data?.data;

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [ebl365ToDelete, setEbl365ToDelete] = useState(null);

  const [selectedUpdateBooth, setSelectedUpdateBooth] = useState(null);

  const [delete365Booth] = useDeleteEbl365Mutation(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const handleDelete365Booth = async () => {
    try {
      const response = await delete365Booth(ebl365ToDelete);
      console.log("res", response);
      toast.success("EBL 365 deleted successfully");
      refetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = (branchId) => {
    setEbl365ToDelete(branchId);
    setShowDeleteConfirmation(true);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="px-6">
          <div className="flex justify-between items-center my-3">
            <div>
              <Link
                href="/ebl-365/create"
                className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
              >
                <FaPlus className="mr-2" /> Create
              </Link>
            </div>
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
                    "Type",
                    "Zone",
                    "Devices",
                    "Total",
                    "Active",
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
                {ebl365Data?.map((ebl365, index) => (
                  <tr
                    key={ebl365.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-white"
                    } hover:bg-blue-50 transition duration-150`}
                  >
                    <td className="py-2 px-4">{ebl365.ebl365Name}</td>
                    <td className="py-2 px-4">{ebl365.ebl365Address}</td>
                    <td className="py-2 px-4">{ebl365.ebl365StatusType}</td>
                    <td className="py-2 px-4">{ebl365.ebl365Zone}</td>
                    <td className="py-2 px-4">{ebl365.boothDevices}</td>
                    <td className="py-2 px-4">{ebl365.noOfAvailableMachine}</td>
                    <td className="py-2 px-4">{ebl365.noOfRunningMachine}</td>
                    <td className="py-2 px-4">
                      <Link
                        href={`/ebl-365/${ebl365._id}`}
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
                          onClick={() => setSelectedUpdateBooth(ebl365)}
                          className="flex items-center text-blue-500 hover:bg-blue-100 p-2 rounded transition-all duration-300 transform hover:scale-105"
                        >
                          <span className="mr-2 border-b border-transparent hover:border-blue-500 hover:shadow-md">
                            Edit
                          </span>
                        </button>

                        <button
                          onClick={() => handleDeleteButtonClick(ebl365._id)}
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

          {selectedUpdateBooth && (
            <dialog
              id="my_modal_2"
              className="modal modal-bottom sm:modal-middle "
              open
            >
              <section
                method="dialog"
                className="modal-box border border-primary shadow-2xl"
              >
                <Update365Form selectedUpdateBooth={selectedUpdateBooth} />
                <div className="modal-action text-center flex justify-center">
                  <button
                    className="btn btn-sm btn-outline "
                    onClick={() => setSelectedUpdateBooth(null)}
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
                handleDelete365Booth(ebl365ToDelete);
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
