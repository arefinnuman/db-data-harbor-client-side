import { useGetSingleBoothManagementQuery } from "@/redux/boothManagement/bothManagementApi";
import { useRouter } from "next/router";
import LoadingScreen from "../Ui/LoadingScreen";

const SingleBoothManagementComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: boothManagement, isLoading } = useGetSingleBoothManagementQuery(
    id,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
    }
  );
  const boothManagementData = boothManagement?.data || {};
  const {
    numberOfMachine,
    numberOfAc,
    numberOfLight,
    numberOfMineralBoard,
    numberOfUps,
    ebl365,
    createdBy,
  } = boothManagementData;

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="py-4">
          <div className="p-3 bg-white shadow-md rounded-lg mb-4">
            <h1 className="text-xl font-semibold mb-3 text-primary border-b pb-1">
              Booth Details
            </h1>
            <table className="min-w-full text-gray-700">
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Name</td>
                  <td className="p-2">
                    {boothManagementData.ebl365.ebl365Name}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Address</td>
                  <td className="p-2">
                    {boothManagementData.ebl365.ebl365Address}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Zone</td>
                  <td className="p-2">
                    {boothManagementData.ebl365.ebl365Zone}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Booth Devices</td>
                  <td className="p-2">
                    {boothManagementData.ebl365.boothDevices}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Number of Machine</td>
                  <td className="p-2">{numberOfMachine}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Number of AC</td>
                  <td className="p-2">{numberOfAc}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Number of Light</td>
                  <td className="p-2">{numberOfLight}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Number of Mineral Board</td>
                  <td className="p-2">{numberOfMineralBoard}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Number of UPS</td>
                  <td className="p-2">{numberOfUps}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Created By</td>
                  <td className="p-2">{boothManagementData.createdBy.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleBoothManagementComponent;
