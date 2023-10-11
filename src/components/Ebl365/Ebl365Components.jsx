import dbDataHarborLogo from "@/assets/DB-Data-Harbor.png";
import { useGetAllEbl365Query } from "@/redux/ebl365/ebl365Api";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import LoadingScreen from "../Ui/LoadingScreen";

export default function Ebl365Components() {
  const { data, isLoading } = useGetAllEbl365Query(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const ebl365Data = data?.data;

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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
