import { useGetAllEbl365Query } from "@/redux/ebl365/ebl365Api";
import Link from "next/link";
import TableButton from "../Buttons/TableButton";
import LoadingScreen from "../Ui/LoadingScreen";

export default function Ebl365Components() {
  const { data, isLoading } = useGetAllEbl365Query(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const ebl365Data = data?.data;
  console.log("Ebl 365 Data", ebl365Data);

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
                    Name
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Id
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Type
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Zone Type
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Device Availability
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Total
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Active
                  </th>
                  <th className="py-3 px-5 border-b border-gray-400 font-bold text-left">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {ebl365Data?.map((ebl365, index) => (
                  <tr
                    key={ebl365.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : ""
                    } hover:bg-gray-200 transition duration-200`}
                  >
                    <td className="py-3 px-5 border border-gray-300">
                      {ebl365.ebl365Name}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {ebl365.ebl365Address}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {ebl365.ebl365StatusType}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {ebl365.ebl365Zone}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {ebl365.boothDevices}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {ebl365.noOfAvailableMachine}
                    </td>
                    <td className="py-3 px-5 border border-gray-300">
                      {ebl365.noOfRunningMachine}
                    </td>
                    <td className="py-3 px-5 border-b border-gray-300">
                      <Link href={`/ebl-365/${ebl365.id}`}>
                        <TableButton>Details</TableButton>
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

