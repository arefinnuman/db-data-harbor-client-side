import { useGetUnAssignedTerminalsInAssetBookValueQuery } from "@/redux/assetBookValue/assetBookValueApi";
import { useGetUnassignedBoothForAcquisitionQuery } from "@/redux/boothAcquisition/boothAcquisitionApi";
import { useGetUnassignedBoothForBoothManagementQuery } from "@/redux/boothManagement/bothManagementApi";
import { FaStore, FaTerminal, FaToolbox } from "react-icons/fa";

const WarningSection = () => {
  const { data: unAssignedEbl365inBoothAcquisition } =
    useGetUnassignedBoothForAcquisitionQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedEbl365inBoothAcquisitionData =
    unAssignedEbl365inBoothAcquisition?.data;

  const hasUnassignedBoothsInBoothAcquisition =
    unAssignedEbl365inBoothAcquisitionData &&
    unAssignedEbl365inBoothAcquisitionData.length > 0;

  const renderUnassignedBoothsInBoothAcquisition = () => {
    return unAssignedEbl365inBoothAcquisitionData.map((booth, index) => (
      <li key={booth.id}>
        {booth.ebl365Name}
        {index < unAssignedEbl365inBoothAcquisitionData.length - 1 ? "" : ""}
      </li>
    ));
  };

  const { data: unAssignedEbl365InBoothManagement } =
    useGetUnassignedBoothForBoothManagementQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedEbl365InBoothManagementData =
    unAssignedEbl365InBoothManagement?.data;

  const hasUnassignedBoothsInBoothManagement =
    unAssignedEbl365InBoothManagementData &&
    unAssignedEbl365InBoothManagementData.length > 0;

  const renderUnassignedBoothsInBoothManagement = () => {
    return unAssignedEbl365InBoothManagementData.map((booth, index) => (
      <li key={booth.id}>
        {booth.ebl365Name}
        {index < unAssignedEbl365InBoothManagementData.length - 1 ? "" : ""}
      </li>
    ));
  };

  const { data: unAssignedTerminals } =
    useGetUnAssignedTerminalsInAssetBookValueQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedTerminalsData = unAssignedTerminals?.data;

  const hasUnassignedTerminals =
    unAssignedTerminalsData && unAssignedTerminalsData.length > 0;

  const renderUnassignedTerminals = () => {
    return unAssignedTerminalsData.map((terminal, index) => (
      <li key={terminal.id}>
        {terminal.terminalNameAndId}
        {index < unAssignedTerminalsData.length - 1 ? "" : ""}
      </li>
    ));
  };
  return (
    <div className="flex flex-col space-y-2 px-3 py-2">
      <div>
        {hasUnassignedBoothsInBoothAcquisition && (
          <div className="transform hover:scale-105 transition duration-500 ease-in-out">
            <div className="p-5 mb-5 rounded-lg bg-green-100 shadow-md hover:shadow-lg">
              <div class="flex items-center mb-4">
                <FaStore className="text-green-600 text-2xl mr-3" />
                <h5 className="text-green-600 text-xl font-semibold">
                  Attention: Unassigned Booths in Booth Acquisition
                </h5>
              </div>
              <p className="text-green-600 text-md mb-4">
                The following booths are currently unassigned. Please assign
                them soon:
              </p>
              <ul className="list-disc list-inside pl-6 text-green-600">
                {renderUnassignedBoothsInBoothAcquisition()}
              </ul>
              <a
                href="/assign-booths"
                className="inline-block mt-4 bg-green-600 text-white font-medium py-2 px-4 rounded hover:bg-green-700 transition duration-300"
              >
                Assign Now
              </a>
            </div>
          </div>
        )}
      </div>

      <div>
        {hasUnassignedBoothsInBoothManagement && (
          <div className="transform hover:scale-105 transition duration-500 ease-in-out">
            <div className="p-5 mb-5 rounded-lg bg-purple-100 shadow-md hover:shadow-lg">
              <div class="flex items-center mb-4">
                <FaToolbox className="text-purple-600 text-2xl mr-3" />
                <h5 className="text-purple-600 text-xl font-semibold">
                  Attention: Unassigned Booths in Booth Management
                </h5>
              </div>
              <p className="text-purple-600 text-md mb-4">
                The following booths are currently unassigned. Please assign
                them soon:
              </p>
              <ul className="list-disc list-inside pl-6 text-purple-600">
                {renderUnassignedBoothsInBoothManagement()}
              </ul>
              <a
                href="/manage-booths"
                className="inline-block mt-4 bg-purple-600 text-white font-medium py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
              >
                Manage Now
              </a>
            </div>
          </div>
        )}
      </div>

      <div>
        {hasUnassignedTerminals && (
          <div className="transform hover:scale-105 transition duration-500 ease-in-out">
            <div className="p-5 mb-5 rounded-lg bg-orange-100 shadow-md hover:shadow-lg">
              <div class="flex items-center mb-4">
                <FaTerminal className="text-orange-600 text-2xl mr-3" />
                <h5 className="text-orange-600 text-xl font-semibold">
                  Attention: Unassigned Terminals
                </h5>
              </div>
              <p className="text-orange-600 text-md mb-4">
                The following terminals are currently unassigned. Please assign
                them soon:
              </p>
              <ul className="list-disc list-inside pl-6 text-orange-600">
                {renderUnassignedTerminals()}
              </ul>
              <a
                href="/assign-terminals"
                className="inline-block mt-4 bg-orange-600 text-white font-medium py-2 px-4 rounded hover:bg-orange-700 transition duration-300"
              >
                Assign Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarningSection;
