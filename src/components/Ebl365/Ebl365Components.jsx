import { useGetAllEbl365Query } from "@/redux/ebl365/ebl365Api";
import Link from "next/link";
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
        <section className="p-6">
          <h1 className="text-3xl text-center font-semibold mb-4">
            All Booths Information
          </h1>
          <div className="w-full max-w-6xl m-auto overflow-x-auto shadow-md rounded-xl">
            <table className="w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  {[
                    "Name",
                    "Id",
                    "Type",
                    "Zone Type",
                    "Device Availability",
                    "Total",
                    "Active",
                    "Details",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-3 px-4 border-b-2 border-gray-200 font-semibold text-left"
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
                    } hover:bg-blue-100 transition duration-150`}
                  >
                    <td className="py-2 px-4 border border-gray-200">
                      {ebl365.ebl365Name}
                    </td>
                    <td className="py-2 px-4 border border-gray-200">
                      {ebl365.ebl365Address}
                    </td>
                    <td className="py-2 px-4 border border-gray-200">
                      {ebl365.ebl365StatusType}
                    </td>
                    <td className="py-2 px-4 border border-gray-200">
                      {ebl365.ebl365Zone}
                    </td>
                    <td className="py-2 px-4 border border-gray-200">
                      {ebl365.boothDevices}
                    </td>
                    <td className="py-2 px-4 border border-gray-200">
                      {ebl365.noOfAvailableMachine}
                    </td>
                    <td className="py-2 px-4 border border-gray-200">
                      {ebl365.noOfRunningMachine}
                    </td>
                    <td className="py-2 px-4 border border-gray-200">
                      <Link
                        href={`/ebl-365/${ebl365.id}`}
                        className="flex items-center text-gray-500 hover:text-black transition-all duration-300 transform hover:scale-105"
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
