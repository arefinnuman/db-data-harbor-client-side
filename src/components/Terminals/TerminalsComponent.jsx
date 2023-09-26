import { useGetAllTerminalsQuery } from "@/redux/terminals/terminalApi";
import Link from "next/link";
import LoadingScreen from "../Ui/LoadingScreen";

export default function TerminalsComponent() {
  const { data, isLoading } = useGetAllTerminalsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });
  const terminalsData = data?.data;

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="p-6">
          <h1 className="text-2xl text-center font-semibold mb-4">
            AVAILABLE TERMINALS
          </h1>
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
