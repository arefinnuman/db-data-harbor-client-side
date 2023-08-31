import { useGetAllTerminalsQuery } from "@/redux/terminals/terminalApi";
import TableButton from "../Buttons/TableButton";
import LoadingScreen from "../Ui/LoadingScreen";

export default function TerminalsComponent() {
  const { data, isLoading } = useGetAllTerminalsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const terminalsData = data?.data;

  // i want to show only date, here date comes from mongoose

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className=" p-8">
          <h1 className="text-3xl text-center text-primary mb-2">
            All Terminals
          </h1>
          <div className="w-max-6xl m-auto mt-6 overflow-x-auto shadow-lg rounded-t-md">
            <table className="min-w-full bg-white border rounded">
              <thead className="bg-sky-500 text-white">
                <tr>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Name and ID
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Id
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Type
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Status
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Brand Name
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Deployment Date
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Live Date
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {terminalsData?.map((terminal, index) => (
                  <tr
                    key={terminal.terminalId}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : ""
                    } hover:bg-gray-200 transition duration-200`}
                  >
                    <td className="py-3 px-5 border border-gray-300">
                      {terminal.terminalNameAndId}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {terminal.terminalId}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {terminal.terminalType}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {terminal.terminalStatus}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {terminal.terminalBrand}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {terminal.deploymentDate
                        ? new Date(terminal.deploymentDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {terminal.liveDate
                        ? new Date(terminal.deploymentDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 px-5 border-b border-gray-300">
                      <TableButton>Details</TableButton>
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

