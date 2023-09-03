import { useGetSingleEbl365Query } from "@/redux/ebl365/ebl365Api";
import { useRouter } from "next/router";
import LoadingScreen from "../Ui/LoadingScreen";

const SingleEbl365Components = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetSingleEbl365Query(id, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const ebl365Data = data?.data || {};

  const {
    ebl365Name,
    ebl365Address,
    ebl365Zone,
    ebl365NameInBengali,
    ebl365StatusType,
    locationType,
    areaType,
    areaName,
    geoLatitude,
    geoLongitude,
    branchControllingGl,
    division,
    postalCOde,
    nearestFamousPlace,
    noOfAvailableMachine,
    noOfRunningMachine,
    divisionId,
    districtId,
    upazilaOrThana,
    controlledBy,
    boothDevices,
  } = ebl365Data;

  const machines = ebl365Data.machines || [];

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="p-6 bg-gray-50">
          <div className="p-4 bg-white shadow-md rounded-lg mt-6">
            <h1 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
              Booth Details
            </h1>
            <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <tbody className="text-gray-700">
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Name</td>
                  <td className="p-3 border">{ebl365Name}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Address</td>
                  <td className="p-3 border">{ebl365Address}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Zone</td>
                  <td className="p-3 border">{ebl365Zone}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Name In Bengali</td>
                  <td className="p-3 border">{ebl365NameInBengali}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Status Type</td>
                  <td className="p-3 border">{ebl365StatusType}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Location Type</td>
                  <td className="p-3 border">{locationType}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Area Type</td>
                  <td className="p-3 border">{areaType}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Area Name</td>
                  <td className="p-3 border">{areaName}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Geo Latitude</td>
                  <td className="p-3 border">{geoLatitude}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Geo Longitude</td>
                  <td className="p-3 border">{geoLongitude}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Branch Controlling Gl</td>
                  <td className="p-3 border">{branchControllingGl}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Division</td>
                  <td className="p-3 border">{division}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Postal Code</td>
                  <td className="p-3 border">{postalCOde}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Nearest Famous Place</td>
                  <td className="p-3 border">{nearestFamousPlace}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">No Of Available Machine</td>
                  <td className="p-3 border">{noOfAvailableMachine}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">No Of Running Machine</td>
                  <td className="p-3 border">{noOfRunningMachine}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Division Id</td>
                  <td className="p-3 border">{divisionId}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">District Id</td>
                  <td className="p-3 border">{districtId}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Upazila Or Thana</td>
                  <td className="p-3 border">{upazilaOrThana}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Controlled By</td>
                  <td className="p-3 border">{controlledBy}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-3 border">Booth Devices</td>
                  <td className="p-3 border">{boothDevices}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container mx-auto">
            <div className="p-4 bg-white shadow-md rounded-lg mb-6">
              <h1 className="text-2xl font-semibold mb-4 text-black border-b pb-2">
                Available Machine Details
              </h1>

              {machines.map((machine, index) => (
                <div key={index} className="my-6">
                  <h2 className="text-xl mb-2 text-primary">
                    Machine {index + 1}
                  </h2>
                  <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <tbody className="text-gray-900">
                      <tr className="hover:bg-gray-100">
                        <td className="p-3 border">Terminal Id</td>
                        <td className="p-3 border">{machine.terminalId}</td>
                      </tr>
                      <tr className="hover:bg-gray-100">
                        <td className="p-3 border">Terminal Name</td>
                        <td className="p-3 border">
                          {machine.terminalNameAndId}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100">
                        <td className="p-3 border">Terminal Type</td>
                        <td className="p-3 border">{machine.terminalType}</td>
                      </tr>
                      <tr className="hover:bg-gray-100">
                        <td className="p-3 border">Terminal Status</td>
                        <td className="p-3 border">{machine.terminalStatus}</td>
                      </tr>
                      <tr className="hover:bg-gray-100">
                        <td className="p-3 border">Terminal Brand</td>
                        <td className="p-3 border">{machine.terminalBrand}</td>
                      </tr>
                      <tr className="hover:bg-gray-100">
                        <td className="p-3 border">Terminal Model</td>
                        <td className="p-3 border">{machine.terminalModel}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-center my-5">View Details</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleEbl365Components;

