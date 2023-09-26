import { useGetSingleEbl365Query } from "@/redux/ebl365/ebl365Api";
import Link from "next/link";
import { useRouter } from "next/router";
import IssueFormInSingleEbl365Component from "../Issue/IssueFormInSingleEbl365";
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
        <section className="py-4">
          <div className="p-3 bg-white shadow-md rounded-lg mb-4">
            <h1 className="text-xl font-semibold mb-3 text-primary border-b pb-1">
              Booth Details
            </h1>
            <table className="min-w-full text-gray-700">
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Name</td>
                  <td className="p-2">{ebl365Name}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Address</td>
                  <td className="p-2">{ebl365Address}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Zone</td>
                  <td className="p-2">{ebl365Zone}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Name In Bengali</td>
                  <td className="p-2">{ebl365NameInBengali}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Status Type</td>
                  <td className="p-2">{ebl365StatusType}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Location Type</td>
                  <td className="p-2">{locationType}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Area Type</td>
                  <td className="p-2">{areaType}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Area Name</td>
                  <td className="p-2">{areaName}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Geo Latitude</td>
                  <td className="p-2">{geoLatitude}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Geo Longitude</td>
                  <td className="p-2">{geoLongitude}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Branch Controlling Gl</td>
                  <td className="p-2">{branchControllingGl}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Division</td>
                  <td className="p-2">{division}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Postal Code</td>
                  <td className="p-2">{postalCOde}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Nearest Famous Place</td>
                  <td className="p-2">{nearestFamousPlace}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">No Of Available Machine</td>
                  <td className="p-2">{noOfAvailableMachine}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">No Of Running Machine</td>
                  <td className="p-2">{noOfRunningMachine}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Division Id</td>
                  <td className="p-2">{divisionId}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">District Id</td>
                  <td className="p-2">{districtId}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Upazila Or Thana</td>
                  <td className="p-2">{upazilaOrThana}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Controlled By</td>
                  <td className="p-2">{controlledBy}</td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="p-2">Booth Devices</td>
                  <td className="p-2">{boothDevices}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="container mx-auto p-3">
            <h1 className="text-xl font-semibold mb-3 text-black border-b pb-1">
              Available Machines
            </h1>

            <div className="grid grid-cols-3 gap-4">
              {machines.map((machine, index) => (
                <div
                  key={index}
                  className="bg-white p-3 shadow-sm rounded hover:shadow-md transition-shadow"
                >
                  <h2 className="text-lg text-primary mb-2">
                    Machine {index + 1}
                  </h2>
                  <div>
                    <strong>Terminal Id:</strong> {machine.terminalId}
                  </div>
                  <div>
                    <strong>Name:</strong> {machine.terminalNameAndId}
                  </div>
                  <div>
                    <strong>Type:</strong> {machine.terminalType}
                  </div>
                  <div>
                    <strong>Status:</strong> {machine.terminalStatus}
                  </div>
                  <div>
                    <strong>Brand:</strong> {machine.terminalBrand}
                  </div>
                  <div>
                    <strong>Model:</strong> {machine.terminalModel}
                  </div>
                  <div className="text-center mt-3">
                    <Link
                      href={`/terminals/${machine._id}`}
                      className="text-blue-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <IssueFormInSingleEbl365Component ebl365Id={id} />
        </section>
      )}
    </>
  );
};

export default SingleEbl365Components;
