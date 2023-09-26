import { useGetAllBoothManagementQuery } from "@/redux/boothManagement/bothManagementApi";
import Link from "next/link";
import LoadingScreen from "../Ui/LoadingScreen";

const BoothManagementComponent = () => {
  const { data: boothData, isLoading } = useGetAllBoothManagementQuery(
    undefined,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const boothManagementData = boothData?.data;

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="p-6">
          <h1 className="text-2xl text-center font-semibold mb-4">
            AVAILABLE BOOTHS
          </h1>

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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default BoothManagementComponent;
