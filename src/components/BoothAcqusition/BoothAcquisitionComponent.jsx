import { useGetAllBoothAcquisitionQuery } from "@/redux/boothAcquisition/boothAcquisitionApi";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import LoadingScreen from "../Ui/LoadingScreen";

const BoothAcquisitionComponent = () => {
  const { data: boothAcquisitionAllData, isLoading } =
    useGetAllBoothAcquisitionQuery(undefined, {
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

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="p-6">
          <h1 className="text-2xl text-center font-semibold mb-4">
            BOOTH ACQUISITION
          </h1>

          <div className="w-full max-w-6xl m-auto overflow-x-auto shadow-md rounded-xl">
            <table className="w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  {[
                    "Name",
                    "Address",
                    "Owner Name",
                    "Monthly Rent",
                    "Size",
                    "Contact Year",
                    "Expiry Date",
                    "Board Memo",
                    "Agreement Paper",
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
                      {boothAcquisition.landOwnerInformation?.name}
                    </td>
                    <td className="py-2 px-4">
                      {boothAcquisition.boothMonthlyRent}
                    </td>
                    <td className="py-2 px-4">{boothAcquisition.boothSize}</td>
                    <td className="py-2 px-4">{boothAcquisition.boothType}</td>
                    <td className="py-2 px-4">
                      {boothAcquisition.boothExpiryDate}
                    </td>
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

export default BoothAcquisitionComponent;
