import { useGetSingleBoothAcquisitionQuery } from "@/redux/boothAcquisition/boothAcquisitionApi";
import { useRouter } from "next/router";
import LoadingScreen from "../Ui/LoadingScreen";

const SingleBoothAcquisition = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: boothAcquisition, isLoading } =
    useGetSingleBoothAcquisitionQuery(id, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
    });
  const boothAcquisitionData = boothAcquisition?.data || {};

  const {
    boardMemo,
    agreementBetweenEblAndBoothOwner,
    boothMonthlyRent,
    boothLocation,
    boothSize,
    boothType,
    boothContractYear,
    boothExpiryDate,
  } = boothAcquisitionData;

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
                    {boothAcquisitionData.ebl365.ebl365Name}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Address</td>
                  <td className="p-2">
                    {boothAcquisitionData.ebl365.ebl365Address}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Zone</td>
                  <td className="p-2">
                    {boothAcquisitionData.ebl365.ebl365Zone}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Booth Devices</td>
                  <td className="p-2">
                    {boothAcquisitionData.ebl365.boothDevices}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Booth Monthly Rent</td>
                  <td className="p-2">{boothMonthlyRent}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Booth Location</td>
                  <td className="p-2">{boothLocation}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Booth Size</td>
                  <td className="p-2">{boothSize}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Booth Type</td>
                  <td className="p-2">{boothType}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Booth Contract Year</td>
                  <td className="p-2">{boothContractYear}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Booth Expiry Date</td>
                  <td className="p-2">{boothExpiryDate}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Board Memo</td>
                  <td className="p-2">{boardMemo}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Agreement Between Ebl And Booth Owner</td>
                  <td className="p-2">{agreementBetweenEblAndBoothOwner}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Created By</td>
                  <td className="p-2">
                    {boothAcquisitionData.createdBy.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleBoothAcquisition;
